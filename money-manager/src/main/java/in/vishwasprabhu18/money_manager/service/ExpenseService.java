package in.vishwasprabhu18.money_manager.service;

import in.vishwasprabhu18.money_manager.dto.ExpenseDTO;
import in.vishwasprabhu18.money_manager.entity.CategoryEntity;
import in.vishwasprabhu18.money_manager.entity.ExpenseEntity;
import in.vishwasprabhu18.money_manager.entity.ProfileEntity;
import in.vishwasprabhu18.money_manager.repository.CategoryRepository;
import in.vishwasprabhu18.money_manager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;

    public ExpenseDTO addExpense(ExpenseDTO dto) {
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ExpenseEntity newExpense = toEntity(dto, profile, category);
        newExpense = expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }

    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> entityList = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return entityList.stream().map(this::toDTO).toList();
    }

    public void deleteExpense(Long expenseId) {
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity entity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense Not found"));

        if(!entity.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }
        expenseRepository.delete(entity);
    }

    private ExpenseEntity toEntity(ExpenseDTO dto, ProfileEntity profile, CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpenseDTO toDTO(ExpenseEntity entity) {
        return ExpenseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .amount(entity.getAmount())
                .date(entity.getDate())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
