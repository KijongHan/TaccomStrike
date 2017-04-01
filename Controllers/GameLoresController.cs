using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AvaNet.DataAccessLayer;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AvaNet.Controllers
{
    public class GameLoresController : Controller
    {

        private readonly IGameLoreRepository gameLoreRepository;

        public GameLoresController(IGameLoreRepository gameLoreRepository)
        {
            this.gameLoreRepository = gameLoreRepository;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View(gameLoreRepository.GetAll());
        }

        public IActionResult Details(int ID)
        {
            return View(gameLoreRepository.Find(ID));
        }
    }
}
