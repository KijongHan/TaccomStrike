using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AvaNet.DataAccessLayer;
using AvaNet.Models;

namespace AvaNet.Controllers
{
    public class HomeController : Controller
    {

        private readonly IGameLoreRepository gameLoreRepository;

        public HomeController(IGameLoreRepository gameLoreRepository)
        {
            this.gameLoreRepository = gameLoreRepository;
        }

        public IActionResult Index()
        {
            List<GameLore> mainGameLores = new List<GameLore>();
            mainGameLores.Add(gameLoreRepository.Find("NetSEC"));
            mainGameLores.Add(gameLoreRepository.Find("Liberty Frontier"));
            mainGameLores.Add(gameLoreRepository.Find("Unified Republic"));

            return View(mainGameLores);
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Download()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
