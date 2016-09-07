using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Orchard.ContentManagement;

namespace Chakra.Utils
{
     public static class ContentItemExtensions {
       
        public static MvcHtmlString ItemDisplayLink(this HtmlHelper html, string linkText, IContent content, object htmlAttributes) {
            var metadata = content.ContentItem.ContentManager.GetItemMetadata(content);
            if (metadata.DisplayRouteValues == null)
                return null;

            return html.ActionLink(
                NonNullOrEmpty(linkText, metadata.DisplayText, "view"),
                Convert.ToString(metadata.DisplayRouteValues["action"]),
                metadata.DisplayRouteValues, htmlAttributes);
        }

        private static string NonNullOrEmpty(params string[] values)
        {
            return values.FirstOrDefault(value => !string.IsNullOrEmpty(value));
        }
     }
}