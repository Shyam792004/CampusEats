package com.example.canteen.config;

import com.example.canteen.entity.MenuItem;
import com.example.canteen.entity.User;
import com.example.canteen.repository.MenuItemRepository;
import com.example.canteen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) {
        // Initialize sample users
        if (userRepository.count() == 0) {
            User user1 = new User(null, "Shyam", "shyam@gmail.com", "123", "user");
            userRepository.save(user1);
            System.out.println("Sample user created: shyam@gmail.com / 123");
        }

        // Initialize sample menu items
        if (menuItemRepository.count() == 0) {
            MenuItem[] items = {
                    new MenuItem(null, "Paneer Butter Masala", "Veg", 120.0, "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", "Rich and creamy paneer curry"),
                    new MenuItem(null, "Veg Biryani", "Veg", 100.0, "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", "Aromatic rice with vegetables"),
                    new MenuItem(null, "Dal Tadka", "Veg", 80.0, "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", "Yellow lentils tempered with spices"),
                    new MenuItem(null, "Chicken Biryani", "Non-Veg", 150.0, "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", "Spicy chicken biryani"),
                    new MenuItem(null, "Butter Chicken", "Non-Veg", 180.0, "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", "Creamy tomato-based chicken curry"),
                    new MenuItem(null, "Egg Curry", "Non-Veg", 90.0, "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400", "Boiled eggs in spicy gravy"),
                    new MenuItem(null, "Samosa", "Snacks", 20.0, "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400", "Crispy fried pastry with filling"),
                    new MenuItem(null, "Vada Pav", "Snacks", 25.0, "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400", "Mumbai street food special"),
                    new MenuItem(null, "French Fries", "Snacks", 50.0, "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", "Crispy golden fries"),
                    new MenuItem(null, "Masala Chai", "Beverages", 15.0, "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400", "Indian spiced tea"),
                    new MenuItem(null, "Cold Coffee", "Beverages", 40.0, "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400", "Chilled coffee with ice cream"),
                    new MenuItem(null, "Mango Lassi", "Beverages", 50.0, "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400", "Sweet yogurt drink with mango"),
                    new MenuItem(null, "Chocolate Cake", "Cakes & Chocolates", 60.0, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", "Rich chocolate sponge cake"),
                    new MenuItem(null, "KitKat", "Cakes & Chocolates", 30.0, "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400", "Crispy wafer chocolate bar"),
                    new MenuItem(null, "Brownie", "Cakes & Chocolates", 50.0, "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400", "Fudgy chocolate brownie"),
                    new MenuItem(null, "Orange Juice", "Fresh Juice", 40.0, "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", "Freshly squeezed orange juice"),
                    new MenuItem(null, "Watermelon Juice", "Fresh Juice", 35.0, "https://images.unsplash.com/photo-1597306691227-59c87f9c7f68?w=400", "Refreshing watermelon juice"),
                    new MenuItem(null, "Mixed Fruit Juice", "Fresh Juice", 50.0, "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400", "Blend of seasonal fruits")
            };

            for (MenuItem item : items) {
                menuItemRepository.save(item);
            }
            System.out.println("Sample menu items created successfully!");
        }
    }
}
