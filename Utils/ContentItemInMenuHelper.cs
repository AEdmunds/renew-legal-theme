using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Chakra.Utils
{
    public static class ContentItemInMenuHelper
    {
        public static bool ContentItemInMenu(this HtmlHelper html, string requestUrl, IEnumerable<dynamic> menuItems)
        {
            var applicationPath = html.ViewContext.RequestContext.HttpContext.Request.ApplicationPath;
            
            return CheckItems(menuItems, applicationPath, requestUrl);
        }


        private static bool CheckItems(IEnumerable<dynamic> menuItems, string applicationPath, string requestUrl)
        {
            foreach (var item in menuItems)
            {
                string modelUrl = item.Href.ToString().Replace(applicationPath, string.Empty).TrimEnd('/').ToUpperInvariant();
                if (requestUrl == modelUrl)
                {
                    return true;
                }
            }

            return false;
        }



        public static bool ContentItemInSubMenu(this HtmlHelper html, string requestUrl, IEnumerable<dynamic> menuItems)
        {

            try // fail save try catch 
            {

                var currentList = menuItems as IList<dynamic> ?? menuItems.ToList();
            
                if (menuItems == null || !currentList.Any() || string.IsNullOrEmpty(requestUrl))
                {
                    return false;
                }
            
                var applicationPath = html.ViewContext.RequestContext.HttpContext.Request.ApplicationPath;

                if (CheckItems(AddSubItems(currentList), applicationPath, requestUrl))
                {
                    return true;
                }
                // check parts of menu
                foreach (var item in currentList)
                {
                    string modelUrl = item.Href.ToString().Replace(applicationPath, string.Empty).TrimEnd('/').ToUpperInvariant();

                    if (modelUrl.LastIndexOf('/') > 0)
                    {
                        string modelSubUrl = modelUrl.Substring(0, modelUrl.LastIndexOf('/'));

                        if (requestUrl == modelSubUrl)
                        {
                            return true;
                        }
                    }
                    else // fail save for live and test site / are striped out! 
                    {
                        if (modelUrl.StartsWith(requestUrl))
                        {
                            return true;
                        }
                    }

                }

                return false;
            }
            
            catch (Exception)
            {
                return false;
            }
           
        }


        private static IEnumerable<dynamic> AddSubItems(IEnumerable<dynamic> currentList)
        {
            var allMenuItems = new List<dynamic>();

            foreach (var item in currentList)
            {
                allMenuItems.Add(item);
                var subitems = (IEnumerable<dynamic>)Enumerable.Cast<dynamic>(item);
                if (subitems.Any())
                {
                    allMenuItems.AddRange(AddSubItems(subitems));
                }
            }

            return allMenuItems;
        }


    }
}