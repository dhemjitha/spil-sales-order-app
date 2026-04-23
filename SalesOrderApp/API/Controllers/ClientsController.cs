using API.Models;
using Application.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _repo;
        private readonly IMapper _mapper;
        public ClientsController(IClientRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ClientDto>>(clients));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var client = await _repo.GetByIdAsync(id);
            return client == null ? NotFound() : Ok(_mapper.Map<ClientDto>(client));
        }
    }
}
