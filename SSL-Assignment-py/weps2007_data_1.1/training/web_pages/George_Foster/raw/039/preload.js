 /**
   * PRELOAD-CHANGE
   * This bit of code calls the preload image routine.  The
   * user should change this per site.  The list supplied is
   * a comma delimited (separated) list of image file names.
   * The file names should be surrounded by double quotes " (shift+')
   * and all but the last one have a comma appended to them.
   * 
   * Example: (this example tells the pre-loader to load 4 images.
   *
   *  var imgs = new preloadImages(
   *                             "image1.jpg",
   *                             "image1_over.jpg",
   *                             "image2.jpg",
   *                             "image2_over.jpg"
   *                             );
   * 
   * The user should specify both the rollover and the normal state 
   * image for rollovers.  
   * 
   * The user should also specify any menu images
   * that may "pop-up" on rollover as well as any graphics that are not
   * visible when the page is first displayed.
   *
   * Finally, the user must also specify the relative path to the images, otherwise,
   * the image will not be preloaded correctly.
   * 
   */

//   function initPreloader() {
   function initLoader() {
	
	if (n3) {
		var imgs = new preloadImages(
			"images/news.jpg",
			"images/news_on.jpg",
			"images/news_rt.gif",
			"images/apply.jpg",
			"images/apply_over.jpg",
			"images/apply_rt.gif",
			"images/contact.jpg",
			"images/contact_over.jpg",
			"images/contact_rt.gif",
			"images/search.jpg",
			"images/search_over.jpg",
			"images/search_rt.gif",
			"images/home.jpg",
			"images/home_over.jpg",
			"images/home_rt.gif",
			"images/blank_rt.gif"
		);
	}
   }
