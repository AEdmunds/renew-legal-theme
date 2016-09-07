using Orchard.UI.Resources;

namespace Chakra {
    public class ResourceManifest : IResourceManifestProvider {
        public void BuildManifests(ResourceManifestBuilder builder) {
            var manifest = builder.Add();

            manifest.DefineStyle("bootstrap").SetUrl("bootstrap.min.css");
            manifest.DefineStyle("main").SetUrl("main.css");
            manifest.DefineStyle("supersized").SetUrl("supersized.css");
            manifest.DefineStyle("supersized.shutter").SetUrl("supersized.shutter.css");
            manifest.DefineStyle("fancybox").SetUrl("fancybox/jquery.fancybox.css");
            manifest.DefineStyle("fonts").SetUrl("fonts.css");
            manifest.DefineStyle("fonts-awsome").SetUrl("font.awsome.min.css");
            manifest.DefineStyle("shortcodes").SetUrl("shortcodes.css");
            manifest.DefineStyle("bootstrap-responsive").SetUrl("bootstrap-responsive.min.css");
            manifest.DefineStyle("responsive").SetUrl("responsive.css");
            manifest.DefineStyle("shutter").SetUrl("supersized.shutter.css");
            manifest.DefineStyle("custom").SetUrl("custom.css");
            manifest.DefineStyle("google-fonts").SetUrl("http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic");
            

            manifest.DefineScript("modernizr").SetUrl("modernizr.js");
            // in jquery module 
            //manifest.DefineScript("jQuery").SetUrl("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
            manifest.DefineScript("map").SetUrl("https://maps.googleapis.com/maps/api/js?sensor=true");
            manifest.DefineScript("bootstrap").SetUrl("bootstrap.min.js");
            manifest.DefineScript("supersized").SetUrl("supersized.3.2.7.min.js");
            manifest.DefineScript("waypoints").SetUrl("waypoints.js");
            manifest.DefineScript("waypoints-sticky").SetUrl("waypoints-sticky.js");
            manifest.DefineScript("isotope").SetUrl("jquery.isotope.js");
            manifest.DefineScript("fancybox-pack").SetUrl("jquery.fancybox.pack.js");
            manifest.DefineScript("fancybox-media").SetUrl("jquery.fancybox-media.js");
            manifest.DefineScript("tweet").SetUrl("jquery.tweet.js");
            manifest.DefineScript("plugins").SetUrl("plugins.js");
            manifest.DefineScript("main").SetUrl("main.js");
            manifest.DefineScript("slider").SetUrl("slider.js");



        }
    }
}
