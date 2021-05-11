using Microsoft.EntityFrameworkCore.Migrations;

namespace StageRaceFantasy.Infrastructure.Persistence.Migrations
{
    public partial class AddFantasyRaceTeamTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FantasyRace",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "FantasyRaceTeam",
                columns: table => new
                {
                    FantasyRaceTeamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FantasyRaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyRaceTeam", x => x.FantasyRaceTeamId);
                    table.ForeignKey(
                        name: "FK_FantasyRaceTeam_FantasyRace_FantasyRaceId",
                        column: x => x.FantasyRaceId,
                        principalTable: "FantasyRace",
                        principalColumn: "FantasyRaceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FantasyRaceTeam_FantasyRaceId",
                table: "FantasyRaceTeam",
                column: "FantasyRaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FantasyRaceTeam");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FantasyRace",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)");
        }
    }
}
