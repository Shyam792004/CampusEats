package com.example.canteen.service;

import com.example.canteen.dto.*;
import com.example.canteen.entity.MenuItem;
import com.example.canteen.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public ApiResponse<List<MenuItemResponse>> getAllMenuItems() {
        List<MenuItem> items = menuItemRepository.findAll();
        List<MenuItemResponse> response = items.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "Menu items retrieved successfully", response);
    }

    public ApiResponse<MenuItemResponse> getMenuItemById(Long id) {
        MenuItem item = menuItemRepository.findById(id).orElse(null);
        if (item == null) {
            return new ApiResponse<>(false, "Menu item not found", null);
        }
        return new ApiResponse<>(true, "Menu item found", convertToResponse(item));
    }

    public ApiResponse<List<MenuItemResponse>> getMenuItemsByCategory(String category) {
        List<MenuItem> items = menuItemRepository.findByCategory(category);
        List<MenuItemResponse> response = items.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "Menu items retrieved successfully", response);
    }

    public ApiResponse<MenuItemResponse> addMenuItem(MenuItemRequest request) {
        MenuItem item = new MenuItem();
        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setPrice(request.getPrice());
        item.setImage(request.getImage());
        item.setDescription(request.getDescription());

        MenuItem savedItem = menuItemRepository.save(item);
        return new ApiResponse<>(true, "Menu item added successfully", convertToResponse(savedItem));
    }

    public ApiResponse<MenuItemResponse> updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem item = menuItemRepository.findById(id).orElse(null);
        if (item == null) {
            return new ApiResponse<>(false, "Menu item not found", null);
        }

        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setPrice(request.getPrice());
        item.setImage(request.getImage());
        item.setDescription(request.getDescription());

        MenuItem updatedItem = menuItemRepository.save(item);
        return new ApiResponse<>(true, "Menu item updated successfully", convertToResponse(updatedItem));
    }

    public ApiResponse<Void> deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            return new ApiResponse<>(false, "Menu item not found", null);
        }
        menuItemRepository.deleteById(id);
        return new ApiResponse<>(true, "Menu item deleted successfully", null);
    }

    private MenuItemResponse convertToResponse(MenuItem item) {
        return new MenuItemResponse(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getPrice(),
                item.getImage(),
                item.getDescription()
        );
    }
}