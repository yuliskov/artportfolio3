package org.yuliskov.artportfolio.model;


import javax.persistence.*;
import java.util.*;

@Entity
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String titleEn;
    private String titleRu;
    @Column(length = 100*1024)
    private String description;
    @Column(length = 100*1024)
    private String descriptionEn;
    @Column(length = 100*1024)
    private String descriptionRu;
    private String url;
    private int position;
    @OneToOne(cascade = CascadeType.ALL)
    private MenuItem content;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MenuItem> children;
    private String style;
    private String hide;
    private boolean isRoot = false;

    public String toString() {
        return String.format("{id: %s, title: %s, url: %s, content: %s, children: %s}", getId(), getTitle(), getUrl(), getContent(), getChildren());
    }

    public boolean getIsRoot() {
        return isRoot;
    }

    public void setIsRoot(boolean isRoot) {
        this.isRoot = isRoot;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHide() {
        return hide;
    }

    public void setHide(String hide) {
        this.hide = hide;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public List<MenuItem> getChildren() {
        return children;
    }

    public void setChildren(List<MenuItem> children) {
        this.children = children;
    }

    public MenuItem getContent() {
        return content;
    }

    public void setContent(MenuItem content) {
        this.content = content;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description == null) {
            return;
        }
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if (title == null) {
            return;
        }
        this.title = title;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getTitleRu() {
        return titleRu;
    }

    public void setTitleRu(String titleRu) {
        this.titleRu = titleRu;
    }

    public String getDescriptionRu() {
        return descriptionRu;
    }

    public void setDescriptionRu(String descriptionRu) {
        this.descriptionRu = descriptionRu;
    }
}
