using ClaySharp;
using Orchard.DisplayManagement.Shapes;
using System;
using System.Collections.Generic;
using System.Linq;
using Orchard.DisplayManagement;

namespace Chakra.Utils
{
    // usage   :  @Display(ShapeHelper.Find((Shape)Model, "Parts_Title"))   

        public static class ShapeHelper
        {
            public static dynamic Find(Shape model, string name)
            {
                var zones = new Dictionary<string, object>();
                
                ((IClayBehaviorProvider)model).Behavior.GetMembers(_nullFunc, model, zones);
                
                foreach (var key in zones.Keys.Where(key => !key.StartsWith("_")))
                {
                    var zone = zones[key] as IShape;
                    if (zone == null || zone.Metadata.Type != "ContentZone") continue;
            
                    foreach (IShape shape in ((dynamic)zone).Items)
                    {
                        if (shape.Metadata.Type == name) return shape;
                    }
                }
                
                return null;
            
            }

            private static readonly Func<object> _nullFunc = () => null;
        }
    }

