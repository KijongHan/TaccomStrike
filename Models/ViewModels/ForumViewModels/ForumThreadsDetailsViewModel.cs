using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models.ViewModels.ForumViewModels
{
    public class ForumThreadsDetailsViewModel
    {

        public static int NUMBER_OF_COMMENTS_PER_PAGE = 15;

        public int StartIndex { get; set; }

        public string OrderBy { get; set; }

        public ForumThread ForumThread { get; set; }

        public int GetNextStartIndex()
        {
            return NUMBER_OF_COMMENTS_PER_PAGE + StartIndex;
        }

        public int GetPreviousStartIndex()
        {
            return StartIndex - NUMBER_OF_COMMENTS_PER_PAGE;
        }

        public static bool IsStartIndexInRange(int startIndex, int forumCommentsCount)
        {
            //Invalid for indices < 0
            if (startIndex < 0)
            {
                return false;
            }
            //Otherwise empty forum topic pages cannot be shown
            if (forumCommentsCount == 0)
            {
                return true;
            }

            //It may be valid
            else
            {
                //If the number of forum threads dont perfectly divide per page
                if (forumCommentsCount % NUMBER_OF_COMMENTS_PER_PAGE != 0)
                {
                    //Increase the count variable until the remainder is enough to fill a page
                    while (forumCommentsCount % NUMBER_OF_COMMENTS_PER_PAGE != 0)
                    {
                        forumCommentsCount++;
                    }
                }

                //Determine if the start index has gone over the max. amount of pages possible
                if (forumCommentsCount < startIndex + NUMBER_OF_COMMENTS_PER_PAGE)
                {
                    //start index not inside the range
                    return false;
                }
            }

            return true;
        }

        public static int GetStartIndex(int startIndex, int forumCommentsCount)
        {
            //Invalid for indices < 0
            if (startIndex < 0)
            {
                return 0;
            }
            //It may be valid
            else
            {
                //If the number of forum threads dont perfectly divide per page
                if (forumCommentsCount % NUMBER_OF_COMMENTS_PER_PAGE != 0)
                {
                    //Increase the count variable until the remainder is enough to fill a page
                    while (forumCommentsCount % NUMBER_OF_COMMENTS_PER_PAGE != 0)
                    {
                        forumCommentsCount++;
                    }
                }

                //Determine if the start index has gone over the max. amount of pages possible
                if (forumCommentsCount < startIndex + NUMBER_OF_COMMENTS_PER_PAGE)
                {
                    //This handles the case for when user specifies start index way beyond range
                    return forumCommentsCount - NUMBER_OF_COMMENTS_PER_PAGE;
                }
                //Has not gone over, set the start index
                else
                {
                    return startIndex;
                }
            }
        }

    }
}
