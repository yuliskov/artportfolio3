package org.yuliskov.artportfolio.service;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.yuliskov.artportfolio.model.*;
import org.yuliskov.artportfolio.repository.*;
import org.yuliskov.artportfolio.util.*;

import java.util.*;

@Service
public class MenuItemService {
    @Autowired
    private MenuItemRepository repository;
    private MenuItemLocalizator localizator = MenuItemLocalizator.getInstanse();

    public List<MenuItem> findAll() {
        return localizator.localize(repository.findAll());
    }

    public List<MenuItem> save(List<MenuItem> items) {
        return repository.save(localizator.delocalize(items));
    }

    public long count() {
        return repository.count();
    }

    public void deleteAllInBatch() {
        repository.deleteAllInBatch();
    }
}
