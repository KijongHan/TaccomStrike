using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models.ViewModels.ForumViewModels
{
    public class ForumThreadsIndexViewModel
    {

        public static int NUMBER_OF_THREADS_PER_PAGE = 15;

        public string ForumTopicTitle { get; set; }

        public int ForumTopicID { get; set; }

        public string OrderBy { get; set; }

        public int StartIndex { get; set; }

        public PinnedForumThreads PinnedForumThreads { get; set; }

        public IEnumerable<ForumThread> ForumThreads { get; set; }
        
        public int GetNextStartIndex()
        {
            return NUMBER_OF_THREADS_PER_PAGE + StartIndex;
        }

        public int GetPreviousStartIndex()
        {
            return StartIndex - NUMBER_OF_THREADS_PER_PAGE;
        }

        public static bool IsStartIndexInRange(int startIndex, int forumThreadsCount)
        {
            //Invalid for indices < 0
            if (startIndex < 0)
            {
                return false;
            }
            //Otherwise empty forum topic pages cannot be shown
            if (forumThreadsCount == 0)
            {
                return true;
            }

            //It may be valid
            else
            {
                //If the number of forum threads dont perfectly divide per page
                if (forumThreadsCount % NUMBER_OF_THREADS_PER_PAGE != 0)
                {
                    //Increase the count variable until the remainder is enough to fill a page
                    while (forumThreadsCount % NUMBER_OF_THREADS_PER_PAGE != 0)
                    {
                        forumThreadsCount++;
                    }
                }

                //Determine if the start index has gone over the max. amount of pages possible
                if (forumThreadsCount < startIndex + NUMBER_OF_THREADS_PER_PAGE)
                {
                    //start index not inside the range
                    return false;
                }
            }

            return true;
        }

        public static int GetStartIndex(int startIndex, int forumThreadsCount)
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
                if (forumThreadsCount % NUMBER_OF_THREADS_PER_PAGE != 0)
                {
                    //Increase the count variable until the remainder is enough to fill a page
                    while (forumThreadsCount % NUMBER_OF_THREADS_PER_PAGE != 0)
                    {
                        forumThreadsCount ++;
                    }
                }

                //Determine if the start index has gone over the max. amount of pages possible
                if (forumThreadsCount < startIndex + NUMBER_OF_THREADS_PER_PAGE)
                {
                    //This handles the case for when user specifies start index way beyond range
                    return forumThreadsCount - NUMBER_OF_THREADS_PER_PAGE;
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
