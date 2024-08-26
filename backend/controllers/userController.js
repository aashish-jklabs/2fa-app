const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/user');
const sendOtp = require('../utils/sendOtp');
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log('signup', email, password);
    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: 'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashedPassword', hashedPassword);
        
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error occured' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        console.log('User saved', user);
        
        await sendOtp(email, otp);
        res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user || user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.generateTotpSecret = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if(!user) return res.status(404).json({ message: 'user not found' });

        const secret = speakeasy.generateSecret({ name: `MyApp (${user.email}`});

        user.totpSecret = secret.base32;
        user.isTotpEnabled = true;
        await user.save();

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        res.status(200).json({ qrCodeUrl, secret: secret.base32 });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


exports.verifyTotp = async (req, res) => {
    const { email, token } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !user.isTotpEnabled) {
        return res.status(400).json({ message: 'TOTP not enabled or user not found' });
      }
  
      const verified = speakeasy.totp.verify({
        secret: user.totpSecret,
        encoding: 'base32',
        token,
      });
  
      if (!verified) {
        return res.status(400).json({ message: 'Invalid TOTP token' });
      }
  
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ jwtToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};

exports.googleAuth = async (req, res) => {
    const { token } =  req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email } = decodedToken;

        let user = await User.findOne({ email });
        if(!user) {
            user = await User.create({ email, provider: 'google' });
        }

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ authToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

