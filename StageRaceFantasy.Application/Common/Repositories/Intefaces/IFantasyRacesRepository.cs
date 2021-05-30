using StageRaceFantasy.Domain.Entities;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories.Intefaces
{
    public interface IFantasyRacesRepository : IRepositoryBase<FantasyRaceEntity>
    {
        Task<RiderFantasyRaceEntryEntity?> GetRaceEntryForRiderOrDefault(int fantasyRaceId, int riderId);
    }
}
