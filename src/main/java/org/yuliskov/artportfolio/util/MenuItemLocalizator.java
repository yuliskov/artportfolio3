package org.yuliskov.artportfolio.util;

import org.springframework.web.context.request.*;
import org.springframework.web.servlet.*;
import org.springframework.web.servlet.support.*;
import org.yuliskov.artportfolio.model.*;

import javax.servlet.http.*;
import java.util.*;

public class MenuItemLocalizator {
    private static MenuItemLocalizator instanse;
    private static final String RUSSIAN = "ru";
    private static final String ENGLISH = "us";

    public static MenuItemLocalizator getInstanse() {
        return instanse == null ? instanse = new MenuItemLocalizator() : instanse;
    }

    public List<MenuItem> localize(List<MenuItem> items) {
        if (items == null) {
            return null;
        }
        String currentLanguage = getCurrentLanguage();

        for (MenuItem item : items) {
            pullFields(item, currentLanguage);
            pullFields(item.getContent(), currentLanguage);
            localize(item.getChildren());
        }
        return items;
    }

    public List<MenuItem> delocalize(List<MenuItem> items) {
        if (items == null) {
            return null;
        }
        String currentLocale = getCurrentLanguage();

        for (MenuItem item : items) {
            pushFields(item, currentLocale);
            pushFields(item.getContent(), currentLocale);
            delocalize(item.getChildren());
        }
        return items;
    }


    private void pullFields(MenuItem item, String language) {
        if (item == null) {
            return;
        }
        switch (language) {
            case RUSSIAN:
                item.setTitle(item.getTitleRu());
                item.setDescription(item.getDescriptionRu());
                break;
            case ENGLISH:
                item.setTitle(item.getTitleEn());
                item.setDescription(item.getDescriptionEn());
                break;
        }
    }

    private void pushFields(MenuItem item, String language) {
        if (item == null) {
            return;
        }
        switch (language) {
            case RUSSIAN:
                item.setTitleRu(item.getTitle());
                item.setDescriptionRu(item.getDescription());
                break;
            case ENGLISH:
                item.setTitleEn(item.getTitle());
                item.setDescriptionEn(item.getDescription());
                break;
        }
    }

    private String getCurrentLanguage() {
        LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(retrieveRequest());
        return localeResolver.resolveLocale(retrieveRequest()).getLanguage();
    }

    private HttpSession retrieveSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true); // true == allow create
    }

    private HttpServletRequest retrieveRequest() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest();
    }
}
