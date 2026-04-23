using Application.Interfaces;
using AutoMapper;
using API.Models;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesOrdersController : ControllerBase
    {
        private readonly ISalesOrderRepository _repo;
        private readonly IMapper _mapper;

        public SalesOrdersController(ISalesOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<SalesOrderDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _repo.GetByIdAsync(id);
            return order == null ? NotFound() : Ok(_mapper.Map<SalesOrderDto>(order));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSalesOrderDto dto)
        {
            var order = _mapper.Map<SalesOrder>(dto);
            var created = await _repo.CreateAsync(order);
            var result = await _repo.GetByIdAsync(created.OrderId);
            return CreatedAtAction(nameof(GetById), new { id = created.OrderId }, _mapper.Map<SalesOrderDto>(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateSalesOrderDto dto)
        {
            var order = _mapper.Map<SalesOrder>(dto);
            order.OrderId = id;
            var updated = await _repo.UpdateAsync(order);
            return updated == null ? NotFound() : Ok(_mapper.Map<SalesOrderDto>(updated));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
}