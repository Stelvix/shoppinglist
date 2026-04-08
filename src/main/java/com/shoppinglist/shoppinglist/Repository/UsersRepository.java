package com.shoppinglist.shoppinglist.Repository;

import com.shoppinglist.shoppinglist.Models.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository  extends JpaRepository<User, UUID> {

}
