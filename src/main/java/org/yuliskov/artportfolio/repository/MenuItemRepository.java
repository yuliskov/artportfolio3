package org.yuliskov.artportfolio.repository;
import org.springframework.data.jpa.repository.*;
import org.yuliskov.artportfolio.model.*;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
