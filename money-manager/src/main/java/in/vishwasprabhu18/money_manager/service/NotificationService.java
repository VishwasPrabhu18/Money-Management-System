package in.vishwasprabhu18.money_manager.service;

import in.vishwasprabhu18.money_manager.dto.ExpenseDTO;
import in.vishwasprabhu18.money_manager.entity.ProfileEntity;
import in.vishwasprabhu18.money_manager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

    //    @Scheduled(cron = "0 * * * * *", zone = "IST")  // Every Minute sends an email
    @Scheduled(cron = "0 0 22 * * *", zone = "IST")  // At 10:00 PM sends one email daily
    public void sendDailyIncomeExpenseRemainder() {
        log.info("Job started: sendDailyIncomeExpenseRemainder()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles) {
            String body = "Hi " + profile.getFullName() + ",<br><br>"
                    + "This is a friendly reminder to add your income and expenses for today in Money Manager.<br><br>"
                    + "<a href=" + frontendUrl + " style='display:inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;'>Go to Money Manager</a>"
                    + "<br><br>Best regards, <br>Money Manager Team";

            emailService.sendEmail(profile.getEmail(), "Daily reminder: Add your income and expenses", body);
        }
        log.info("Job completed: sendDailyIncomeExpenseRemainder()");
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST")  // At 10:00 PM sends one email daily
    public void sendDailyExpenseSummary() {
        log.info("Job started: sendDailyExpenseSummary()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles) {
            List<ExpenseDTO> todayExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());
            if (!todayExpenses.isEmpty()) {
                StringBuilder table = new StringBuilder();
                table.append("<table style='border-collapse: collapse; width: 100%;'>");
                table.append("<tr style='background-color: #f2f2f2;'>");
                table.append("<th style='border: 1px solid #ddd; padding: 8px;'>S.No</th>");
                table.append("<th style='border: 1px solid #ddd; padding: 8px;'>Name</th>");
                table.append("<th style='border: 1px solid #ddd; padding: 8px;'>Category</th>");
                table.append("<th style='border: 1px solid #ddd; padding: 8px;'>Amount</th>");
                table.append("</tr>");
                int i = 1;
                for (ExpenseDTO expenseDTO : todayExpenses) {
                    table.append("<tr>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(i++).append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDTO.getName()).append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDTO.getCategoryId() != null ? expenseDTO.getCategoryName() : "N/A").append("</td>");
                    table.append("<td style='border: 1px solid #ddd; padding: 8px;'>₹").append(expenseDTO.getAmount()).append("</td>");
                    table.append("</tr>");
                }
                table.append("</table>");
                String subject = "Your daily Expense Report";
                String body = "Hi " + profile.getFullName() + ", <br><br>"
                        + "Here is a summary of your today's expenses:<br><br>"
                        + table
                        + "<br><br>Best regards,<br>"
                        + "Money Manager Team";

                emailService.sendEmail(profile.getEmail(), subject, body);
            }
        }
        log.info("Job completed: sendDailyExpenseSummary()");
    }
}
