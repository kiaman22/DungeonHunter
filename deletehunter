require('dotenv').config();
const mongoose = require('mongoose');
const Hunter = require('./models/Hunter');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  const result = await Hunter.deleteOne({ username: 'ragna' });

  if (result.deletedCount > 0) {
    console.log('🗑️ ลบ ragna สำเร็จแล้ว');
  } else {
    console.log('⚠️ ไม่พบ hunter ชื่อ ragna');
  }

  mongoose.disconnect();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
