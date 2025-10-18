package com.example.canteen.dto;

import com.example.canteen.dto.MenuItemResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private Long userId;
    private String userName;
    private String userEmail;
    private MenuItemResponse item;
    private Integer quantity;
    private Double total;
    private String orderDate;
    private String status;
}