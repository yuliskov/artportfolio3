package org.yuliskov.artportfolio.controller;

import org.slf4j.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.*;
import org.springframework.web.servlet.*;
import org.springframework.web.servlet.support.*;

@Controller
public class MenuItemController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/")
    public String home() {
        return "home.html";
    }

    @RequestMapping(value = "/", params = "locale")
    public ResponseEntity<Void> homeSwitchLocale(@RequestParam String locale) {
        switchLocale(locale);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/admin")
    public String admin() {
        return "admin.html";
    }

    @RequestMapping(value = "/google8751348e92fea714.html")
    public String googleVerification() {
        return "google8751348e92fea714.html";
    }

    @RequestMapping(value = "/admin", params = "locale")
    public String adminSwitchLocale(@RequestParam(required = false) String locale) {
        // switchLocale(locale);
        return "redirect:/admin";
    }

    public void switchLocale(@RequestParam String locale) {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(attr.getRequest());
        localeResolver.setLocale(attr.getRequest(), attr.getResponse(), StringUtils.parseLocaleString(locale));
    }
}
