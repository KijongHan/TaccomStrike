using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CallCheatOnline.Library.Utility.Security
{
	public class HtmlSanitizer
	{
		public string RemoveUnwantedTags(string data)
		{
			if (string.IsNullOrEmpty(data)) return string.Empty;

			var document = new HtmlDocument();
			document.LoadHtml(data);

			var acceptableTags = new String[] { "strong", "em", "u", "br", "h2", "h1", "h3" };

			var nodes = new Queue<HtmlNode>(document.DocumentNode.SelectNodes("./*|./text()"));
			while (nodes.Count > 0)
			{
				var node = nodes.Dequeue();
				var parentNode = node.ParentNode;

				if (!acceptableTags.Contains(node.Name) && node.Name != "#text")
				{
					var childNodes = node.SelectNodes("./*|./text()");

					if (childNodes != null)
					{
						foreach (var child in childNodes)
						{
							nodes.Enqueue(child);
							parentNode.InsertBefore(child, node);
						}
					}
					parentNode.RemoveChild(node);

				}
			}
			return document.DocumentNode.InnerHtml;
		}
	}
}
