const bookingConfirmationTemplate = (booking) => {
    const { user, show, bookedSeats, amount } = booking;
    const movieTitle = show.movie.title;
    const showDate = new Date(show.showDate).toDateString();
    const showTime = show.showTime;
    const seats = bookedSeats.join(', ');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Booking Confirmation</title>
        <style>
            body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: 'Segoe UI', Arial, sans-serif; color: #f0f0f0; }
            .wrapper { max-width: 600px; margin: 40px auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #2e2e2e; }
            .header { background-color: #111; padding: 32px 40px; text-align: center; border-bottom: 1px solid #2e2e2e; }
            .header img { height: 40px; }
            .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center; }
            .hero h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; }
            .hero p { margin: 0; font-size: 15px; color: #a0a0b0; }
            .content { padding: 40px; }
            .greeting { font-size: 16px; color: #c0c0c0; margin-bottom: 28px; }
            .booking-card { background-color: #111; border: 1px solid #2e2e2e; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
            .booking-card-header { background-color: #c8a951; padding: 14px 24px; }
            .booking-card-header h2 { margin: 0; font-size: 18px; font-weight: 700; color: #111; letter-spacing: 0.3px; }
            .booking-card-body { padding: 24px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { color: #888; }
            .detail-value { color: #f0f0f0; font-weight: 600; text-align: right; }
            .amount-row { background-color: #1e1e1e; border-radius: 8px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
            .amount-label { font-size: 15px; color: #a0a0a0; }
            .amount-value { font-size: 22px; font-weight: 700; color: #c8a951; }
            .note { background-color: #111; border-left: 3px solid #c8a951; padding: 16px 20px; border-radius: 4px; font-size: 13px; color: #909090; margin-bottom: 28px; line-height: 1.6; }
            .footer { background-color: #111; border-top: 1px solid #2e2e2e; padding: 28px 40px; text-align: center; }
            .footer p { margin: 0 0 6px 0; font-size: 12px; color: #555; }
            .footer a { color: #c8a951; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header">
                <!-- Replace src with your actual logo URL -->
                <img src="YOUR_LOGO_URL" alt="BookNWatch"/>
            </div>

            <div class="hero">
                <h1>Booking Confirmed</h1>
                <p>Your seats are reserved. Enjoy the show.</p>
            </div>

            <div class="content">
                <p class="greeting">Hello ${user.name},<br/>Your booking for <strong>${movieTitle}</strong> has been confirmed. Here are your details:</p>

                <div class="booking-card">
                    <div class="booking-card-header">
                        <h2>${movieTitle}</h2>
                    </div>
                    <div class="booking-card-body">
                        <div class="detail-row">
                            <span class="detail-label">Date</span>
                            <span class="detail-value">${showDate}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Time</span>
                            <span class="detail-value">${showTime}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Seats</span>
                            <span class="detail-value">${seats}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Booking ID</span>
                            <span class="detail-value">#${booking._id.toString().slice(-8).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div class="amount-row">
                    <span class="amount-label">Total Paid</span>
                    <span class="amount-value">INR ${amount}</span>
                </div>

                <br/>

                <div class="note">
                    Please arrive at least 15 minutes before the show. Carry a valid ID proof along with this confirmation for entry. This ticket is non-refundable once the show has started.
                </div>
            </div>

            <div class="footer">
                <p>You received this email because you booked a ticket on <a href="#">BookNWatch</a>.</p>
                <p>For support, contact us at <a href="mailto:support@booknwatch.com">support@booknwatch.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

const reminderTemplate = (task) => {
    const { userName, movieTitle, showTime } = task;
    const formattedTime = new Date(showTime).toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'short'
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Show Reminder</title>
        <style>
            body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: 'Segoe UI', Arial, sans-serif; color: #f0f0f0; }
            .wrapper { max-width: 600px; margin: 40px auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #2e2e2e; }
            .header { background-color: #111; padding: 32px 40px; text-align: center; border-bottom: 1px solid #2e2e2e; }
            .header img { height: 40px; }
            .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center; }
            .hero h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; }
            .hero p { margin: 0; font-size: 15px; color: #a0a0b0; }
            .content { padding: 40px; }
            .greeting { font-size: 16px; color: #c0c0c0; margin-bottom: 28px; line-height: 1.6; }
            .reminder-card { background-color: #111; border: 1px solid #2e2e2e; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
            .reminder-card-header { background-color: #c8a951; padding: 14px 24px; }
            .reminder-card-header h2 { margin: 0; font-size: 18px; font-weight: 700; color: #111; }
            .reminder-card-body { padding: 24px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { color: #888; }
            .detail-value { color: #f0f0f0; font-weight: 600; text-align: right; }
            .note { background-color: #111; border-left: 3px solid #c8a951; padding: 16px 20px; border-radius: 4px; font-size: 13px; color: #909090; margin-bottom: 28px; line-height: 1.6; }
            .footer { background-color: #111; border-top: 1px solid #2e2e2e; padding: 28px 40px; text-align: center; }
            .footer p { margin: 0 0 6px 0; font-size: 12px; color: #555; }
            .footer a { color: #c8a951; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header">
                <img src="YOUR_LOGO_URL" alt="BookNWatch"/>
            </div>

            <div class="hero">
                <h1>Your Show is Coming Up</h1>
                <p>Get ready for a great experience.</p>
            </div>

            <div class="content">
                <p class="greeting">Hello ${userName},<br/>This is a reminder that your movie is starting in the next 8 hours. Make sure you are all set.</p>

                <div class="reminder-card">
                    <div class="reminder-card-header">
                        <h2>${movieTitle}</h2>
                    </div>
                    <div class="reminder-card-body">
                        <div class="detail-row">
                            <span class="detail-label">Show Time</span>
                            <span class="detail-value">${formattedTime}</span>
                        </div>
                    </div>
                </div>

                <div class="note">
                    Please arrive at least 15 minutes before the show. Carry a valid ID proof along with your booking confirmation for entry.
                </div>
            </div>

            <div class="footer">
                <p>You received this reminder because you have an upcoming booking on <a href="#">BookNWatch</a>.</p>
                <p>For support, contact us at <a href="mailto:support@booknwatch.com">support@booknwatch.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

const newShowTemplate = ({ userName, movieTitle }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Show Added</title>
        <style>
            body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: 'Segoe UI', Arial, sans-serif; color: #f0f0f0; }
            .wrapper { max-width: 600px; margin: 40px auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #2e2e2e; }
            .header { background-color: #111; padding: 32px 40px; text-align: center; border-bottom: 1px solid #2e2e2e; }
            .header img { height: 40px; }
            .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center; }
            .hero h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; }
            .hero p { margin: 0; font-size: 15px; color: #a0a0b0; }
            .content { padding: 40px; }
            .greeting { font-size: 16px; color: #c0c0c0; margin-bottom: 28px; line-height: 1.6; }
            .movie-card { background-color: #111; border: 1px solid #2e2e2e; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
            .movie-card-header { background-color: #c8a951; padding: 14px 24px; }
            .movie-card-header h2 { margin: 0; font-size: 18px; font-weight: 700; color: #111; }
            .movie-card-body { padding: 24px; font-size: 14px; color: #a0a0a0; line-height: 1.7; }
            .cta { text-align: center; margin: 28px 0; }
            .cta a { background-color: #c8a951; color: #111; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 15px; display: inline-block; }
            .note { background-color: #111; border-left: 3px solid #c8a951; padding: 16px 20px; border-radius: 4px; font-size: 13px; color: #909090; margin-bottom: 28px; line-height: 1.6; }
            .footer { background-color: #111; border-top: 1px solid #2e2e2e; padding: 28px 40px; text-align: center; }
            .footer p { margin: 0 0 6px 0; font-size: 12px; color: #555; }
            .footer a { color: #c8a951; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header">
                <img src="YOUR_LOGO_URL" alt="BookNWatch"/>
            </div>

            <div class="hero">
                <h1>New Show Just Added</h1>
                <p>Seats are filling up fast. Book yours now.</p>
            </div>

            <div class="content">
                <p class="greeting">Hello ${userName},<br/>A new show has just been added on BookNWatch. Be the first to grab your seats before they run out.</p>

                <div class="movie-card">
                    <div class="movie-card-header">
                        <h2>${movieTitle}</h2>
                    </div>
                    <div class="movie-card-body">
                        A new show for this movie is now available for booking. Head over to BookNWatch and reserve your preferred seats at the earliest.
                    </div>
                </div>

                <div class="cta">
                    <a href="YOUR_APP_URL">Book Now</a>
                </div>

                <div class="note">
                    Seats are limited and allocated on a first-come, first-served basis. Early booking is recommended to secure your preferred seats.
                </div>
            </div>

            <div class="footer">
                <p>You received this email because you are registered on <a href="#">BookNWatch</a>.</p>
                <p>For support, contact us at <a href="mailto:support@booknwatch.com">support@booknwatch.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

module.exports = { bookingConfirmationTemplate, reminderTemplate, newShowTemplate }