# Overview (Purpose)

Portfolio for graphic artist. Site main contents is an art works that are logically categorized. 

From administration perspective user should able to perform basic operations (add/remove/reorder items) as simple as possible. 
One of the straightforward ways to achieve this is an in place edit mode. 
I.e. user no need to learn new graphic interface, instead all additional elements will be mixed with current ones. 

Instant run: 

- Enter in console: `mvn tomcat7:run -Dspring.profiles.active=dev`
- Open url: `http://localhost:8080`


# Technologies

- User side: backbone.js, jquery, underscore.js.
- Server side: spring, jpa, apache commons, gif animation, jackson json parser.

# Why

Selected technologies had been selected because of communication scheme between client and server. 

This scheme so called REST: 

- server responsible for data transfer 
- client responsible how this data will be rendered 

REST helps:
 
- reduce traffic rate; 
- re-render only area that has been changed

# Structure

Overall architecture of project is MVC where client responsible for creating views from models. Models transported from server in JSON format.

## Server side

- Controllers: RestController, MainController, UtilController.
    - RestController does REST processing
    - MainController responsible for pages processing
    - UtilController is handling uploads.

- Business objects: GalleryModel, ImageModel, DataModel. 
    - Purpose of GalleryModel to split images (arts) into logical parts. 
As I said GalleryModel contains list of images. Also it contains title of a group. 
    - ImageModel contains image, video or other artwork with its title or name and preview.
    - DataModel helps easy load ImageModel object obtained through SiteService class. Internally SiteService uses object specific DAOs.

- Helper objects: ImageConverter, UploadUtil. 
    - ImageConverter responsible of creation previews. It can process any type of images including animated GIFs.
    - UploadUtil responsible of creation business objects from web forms post data.
    
## Client side

- Models with same names as their server analogs.
    - Models mostly but not fully corresponding to the same things in server side. Purpose is increasing performance of site.
- Views
    - Stores UI code.
    - Views are dynamically created from client side models.
- Controller
    - It's is view that serves as entry point. 
    - Responsible for initialization views with data from models.












