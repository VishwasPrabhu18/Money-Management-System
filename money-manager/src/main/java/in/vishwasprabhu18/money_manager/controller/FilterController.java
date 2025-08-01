package in.vishwasprabhu18.money_manager.controller;

import in.vishwasprabhu18.money_manager.dto.ExpenseDTO;
import in.vishwasprabhu18.money_manager.dto.FilterDTO;
import in.vishwasprabhu18.money_manager.dto.IncomeDTO;
import in.vishwasprabhu18.money_manager.service.ExpenseService;
import in.vishwasprabhu18.money_manager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filterDTO) {
        LocalDate startDate = filterDTO.getStartDate() != null ? filterDTO.getStartDate() : LocalDate.MIN;
        LocalDate endDate = filterDTO.getEndDate() != null ? filterDTO.getEndDate() : LocalDate.now();
        String keyword = filterDTO.getKeyword() != null ? filterDTO.getKeyword() : "";
        String sortField = filterDTO.getSortField() != null ? filterDTO.getSortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(filterDTO.getSortOrder()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        if(filterDTO.getType().equalsIgnoreCase("income")) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);
        } else if(filterDTO.getType().equalsIgnoreCase("expense")) {
            List<ExpenseDTO> incomes = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);
        } else {
            return ResponseEntity.badRequest().body("Invalid type must be either or income or expense");
        }
    }
}
