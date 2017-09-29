package org.yuliskov.artportfolio.controller;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.yuliskov.artportfolio.model.*;
import org.yuliskov.artportfolio.repository.*;
import org.yuliskov.artportfolio.service.*;

import java.util.*;

@RestController
public class MenuItemRestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public static final String LANGUAGE = "language";

    //private MenuItemRepository repository;
    @Autowired
    private MenuItemService repository;

    @RequestMapping(value = "/menuitems", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    ResponseEntity<List<MenuItem>> findAll(){
        if (repository.count() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<MenuItem> all = repository.findAll();
        List<MenuItem> res = new ArrayList<>();

        for (MenuItem item : all) {
            if (item.getIsRoot()) res.add(item);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/menuitems", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    ResponseEntity<List<MenuItem>> saveAll(@RequestBody MenuItem[] items) {
        HttpStatus status = HttpStatus.OK;
        if (repository.count() == 0) {
            status = HttpStatus.CREATED;
        }
        repository.deleteAllInBatch();
        for (MenuItem item : items) {
            item.setIsRoot(true);
        }
        logger.info("items length {}", items.length);
        logger.info("items before {}", Arrays.toString(items));
        List<MenuItem> itemsAfter = repository.save(Arrays.asList(items));
        logger.info("items after {}", itemsAfter);

        return new ResponseEntity<>(Arrays.asList(items), status);
    }

}
