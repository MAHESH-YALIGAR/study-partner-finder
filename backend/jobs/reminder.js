
const cron = require("node-cron");
const Reminder = require("../models/reminderdb");
const Student = require("../models/studentdb");
const sendEmail = require("../utils/sendEmail");

cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking reminders...");

  const now = new Date();
  const reminders = await Reminder.find({
    dateTime: { $lte: now },
    isCompleted: false,
  });

  for (let reminder of reminders) {
    try {
      const student = await Student.findById(reminder.studentId);

      if (student?.email) {
        console.log(`📨 Sending to ${student.email} | Task: ${reminder.title}`);

        // Create a delete link for the reminder
        // const deleteLink = `http://localhost:5173/delete-reminder/${reminder._id}`;
        const deleteLink = `http://localhost:7000//api/reminder/delete-reminder/${reminder._id}`;

const htmlContent = `
          <div style="font-family: Arial, sans-serif; background: linear-gradient(to right, #eef2ff, #fdf2f8); padding: 20px; border-radius: 12px; max-width: 600px; margin: auto; text-align: center;">
            <h2 style="color: #3b82f6;">📚 Hi ${student.name},</h2>
            <p style="font-size: 16px;">Here’s a friendly reminder for your upcoming task:</p>
            
            <div style="background: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 15px 0;">
              <h3 style="margin: 0; color: #9333ea;">${reminder.title}</h3>
              <p style="margin: 5px 0; color: #555;">${reminder.description}</p>
              <p style="margin: 0; color: #16a34a; font-weight: bold;">📅 ${new Date(reminder.dateTime).toLocaleString()}</p>
            </div>

            <a href="http
        // HTML email content
        ://localhost:5173/student-dashboard" style="display: inline-block; margin: 10px 5px; padding: 12px 20px; font-size: 16px; background: linear-gradient(to right, #3b82f6, #9333ea); color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Go to Dashboard ➡️
            </a>

            <a href="${deleteLink}" style="display: inline-block; margin: 10px 5px; padding: 12px 20px; font-size: 16px; background: #f44336; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Delete Reminder ❌
            </a>

            <p style="font-size: 12px; color: #888; margin-top: 20px;">🌟 Small steps every day lead to big achievements 🌟</p>
          </div>
        `;

        // Send email
        await sendEmail(student.email, "📚 Study Reminder ✨", htmlContent);

        // Mark as completed
        reminder.isCompleted = true;
        await reminder.save();

        console.log("✅ Reminder marked as completed");
      }
    } catch (err) {
      console.error(`❌ Failed to send reminder to ${reminder._id}:`, err);
    }
  }
});
