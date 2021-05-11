using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StageRaceFantasy.Infrastructure.Persistence.Migrations
{
    public partial class RenameFantasyStageRaceToFantasyRace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FantasyStageRace");

            migrationBuilder.CreateTable(
                name: "FantasyRace",
                columns: table => new
                {
                    FantasyRaceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FantasyTeamSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyRace", x => x.FantasyRaceId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FantasyRace");

            migrationBuilder.CreateTable(
                name: "FantasyStageRace",
                columns: table => new
                {
                    FantasyStageRaceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FantasyTeamSize = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyStageRace", x => x.FantasyStageRaceId);
                });
        }
    }
}
