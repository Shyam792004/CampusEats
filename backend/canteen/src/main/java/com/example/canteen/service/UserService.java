package com.example.canteen.service;

import com.example.canteen.dto.*;
import com.example.canteen.entity.User;
import com.example.canteen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ApiResponse<UserResponse> register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse<>(false, "Email already exists!", null);
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Simple password storage
        user.setRole("user");

        User savedUser = userRepository.save(user);

        UserResponse response = new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );

        return new ApiResponse<>(true, "Registration successful!", response);
    }

    public ApiResponse<UserResponse> login(LoginRequest request) {
        // Admin check
        if ("admin@gmail.com".equals(request.getEmail()) && "admin123".equals(request.getPassword())) {
            UserResponse adminResponse = new UserResponse(0L, "Admin", "admin@gmail.com", "admin");
            return new ApiResponse<>(true, "Login successful!", adminResponse);
        }

        // User check
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new ApiResponse<>(false, "User not found!", null);
        }

        // Simple password check
        if (!user.getPassword().equals(request.getPassword())) {
            return new ApiResponse<>(false, "Invalid password!", null);
        }

        UserResponse response = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return new ApiResponse<>(true, "Login successful!", response);
    }
}
