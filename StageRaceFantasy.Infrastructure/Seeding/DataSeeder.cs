using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using StageRaceFantasy.Domain.Entities;
using StageRaceFantasy.Infrastructure.Persistence;
using System;
using System.Globalization;
using System.Linq;

namespace StageRaceFantasy.Infrastructure.Seeding
{
    public class DataSeeder
    {
        public static void SeedTestData(IServiceProvider services)
        {
            var dbContext = services.GetRequiredService<ApplicationDbContext>();
            var logger = services.GetRequiredService<ILogger<DataSeeder>>();

            var anyFantasyRacesExist = dbContext.FantasyRaces.Any();

            if (anyFantasyRacesExist)
            {
                logger.LogInformation("Fantasy Races already exist so not seeding data.");
                return;
            }

            logger.LogInformation("No Fantasy Races exist so creating seed races...");

            FantasyRaceEntity tourDeFrance = new()
            {
                Name = "Tour de France 2021",
                StartDate = new DateTime(2021, 06, 26),
                EndDate = new DateTime(2021, 07, 18),
                FantasyTeamSize = 8,
            };

            FantasyRaceEntity giroDItalia = new()
            {
                Name = "Giro d'Italia 2021",
                StartDate = new DateTime(2021, 05, 8),
                EndDate = new DateTime(2021, 05, 30),
                FantasyTeamSize = 6,
            };

            dbContext.FantasyRaces.Add(tourDeFrance);
            dbContext.FantasyRaces.Add(giroDItalia);

            dbContext.SaveChanges();

            logger.LogInformation("...finished creating seed races.");
        }
    }
}
