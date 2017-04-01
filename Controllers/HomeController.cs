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
            mainGameLores.Add(gameLoreRepository.Find("Nationalist Frontier"));
            mainGameLores.Add(gameLoreRepository.Find("The Old Republic"));

            return View(mainGameLores);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
