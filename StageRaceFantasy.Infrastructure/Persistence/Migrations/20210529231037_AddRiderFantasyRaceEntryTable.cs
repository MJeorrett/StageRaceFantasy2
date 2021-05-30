using Microsoft.EntityFrameworkCore.Migrations;

namespace StageRaceFantasy.Infrastructure.Persistence.Migrations
{
    public partial class AddRiderFantasyRaceEntryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RiderFantasyRaceEntry",
                columns: table => new
                {
                    RiderFantasyRaceEntryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiderId = table.Column<int>(type: "int", nullable: false),
                    FantasyRaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiderFantasyRaceEntry", x => x.RiderFantasyRaceEntryId);
                    table.ForeignKey(
                        name: "FK_RiderFantasyRaceEntry_FantasyRace_FantasyRaceId",
                        column: x => x.FantasyRaceId,
                        principalTable: "FantasyRace",
                        principalColumn: "FantasyRaceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RiderFantasyRaceEntry_Rider_RiderId",
                        column: x => x.RiderId,
                        principalTable: "Rider",
                        principalColumn: "RiderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiderFantasyRaceEntry_FantasyRaceId",
                table: "RiderFantasyRaceEntry",
                column: "FantasyRaceId");

            migrationBuilder.CreateIndex(
                name: "IX_RiderFantasyRaceEntry_RiderId_FantasyRaceId",
                table: "RiderFantasyRaceEntry",
                columns: new[] { "RiderId", "FantasyRaceId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RiderFantasyRaceEntry");
        }
    }
}
