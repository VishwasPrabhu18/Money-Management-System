package in.vishwasprabhu18.money_manager.controller;

import in.vishwasprabhu18.money_manager.dto.AuthDTO;
import in.vishwasprabhu18.money_manager.dto.ProfileDTO;
import in.vishwasprabhu18.money_manager.entity.ProfileEntity;
import in.vishwasprabhu18.money_manager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

import static in.vishwasprabhu18.money_manager.constant.HTMLResponses.ACCOUNT_ACTIVATION_FAILURE;
import static in.vishwasprabhu18.money_manager.constant.HTMLResponses.ACCOUNT_ACTIVATION_SUCCESS;

@RestController
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        boolean isActivate = profileService.activateProfile(token);
        if (isActivate) {
//            return ResponseEntity.ok("Profile Activated Successfully");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE + ";charset=UTF-8")
                    .body(ACCOUNT_ACTIVATION_SUCCESS);
        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation token not found or already used");
            return ResponseEntity.status(404)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE + ";charset=UTF-8")
                    .body(ACCOUNT_ACTIVATION_FAILURE);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        Map.of("message", "Account is not active. Please activate your account first!!")
                );
            }

            Map<String, Object> response = profileService.authenticateAndGenerateToken(authDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getPublicProfile() {
        ProfileDTO profileDTO = profileService.getPublicProfile(null);
        return ResponseEntity.ok(profileDTO);
    }
}
