using StageRaceFantasy.Domain.Entities;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories.Intefaces
{
    public interface IRacesRepository : IRepositoryBase<RaceEntity>
    {
        Task<RiderRaceEntryEntity?> GetRaceEntryForRiderOrDefault(int raceId, int riderId);
    }
}
