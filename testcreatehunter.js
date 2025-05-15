require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Hunter = require('./models/Hunter');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  const plainPassword = 'test1234';
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 คือ saltRounds

  const newHunter = new Hunter({
    username: 'ragna1',
    passwordHash: hashedPassword,
    weapon: 'sword'
  });

  await newHunter.save();
  console.log('🎉 Hunter created:', newHunter);

  mongoose.disconnect();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
