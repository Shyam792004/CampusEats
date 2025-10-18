package com.example.canteen.service;

import com.example.canteen.dto.*;
import com.example.canteen.entity.MenuItem;
import com.example.canteen.entity.Order;
import com.example.canteen.entity.User;
import com.example.canteen.repository.MenuItemRepository;
import com.example.canteen.repository.OrderRepository;
import com.example.canteen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    public ApiResponse<OrderResponse> createOrder(Long userId, OrderRequest request) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse<>(false, "User not found", null);
        }

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId()).orElse(null);
        if (menuItem == null) {
            return new ApiResponse<>(false, "Menu item not found", null);
        }

        Order order = new Order();
        order.setOrderNumber(String.valueOf(100000 + new Random().nextInt(900000)));
        order.setUser(user);
        order.setMenuItem(menuItem);
        order.setQuantity(request.getQuantity());
        order.setTotal(menuItem.getPrice() * request.getQuantity());
        order.setOrderDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        order.setStatus("confirmed");

        Order savedOrder = orderRepository.save(order);
        return new ApiResponse<>(true, "Order placed successfully", convertToResponse(savedOrder));
    }

    public ApiResponse<List<OrderResponse>> getUserOrders(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse<>(false, "User not found", null);
        }

        List<Order> orders = orderRepository.findByUser(user);
        List<OrderResponse> response = orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "Orders retrieved successfully", response);
    }

    public ApiResponse<List<OrderResponse>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponse> response = orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "All orders retrieved successfully", response);
    }

    public ApiResponse<OrderResponse> getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber).orElse(null);
        if (order == null) {
            return new ApiResponse<>(false, "Order not found", null);
        }
        return new ApiResponse<>(true, "Order found", convertToResponse(order));
    }

    private OrderResponse convertToResponse(Order order) {
        MenuItemResponse itemResponse = new MenuItemResponse(
                order.getMenuItem().getId(),
                order.getMenuItem().getName(),
                order.getMenuItem().getCategory(),
                order.getMenuItem().getPrice(),
                order.getMenuItem().getImage(),
                order.getMenuItem().getDescription()
        );

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getUser().getId(),
                order.getUser().getName(),
                order.getUser().getEmail(),
                itemResponse,
                order.getQuantity(),
                order.getTotal(),
                order.getOrderDate(),
                order.getStatus()
        );
    }
}