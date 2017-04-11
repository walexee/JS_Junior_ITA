using EmployeeManager.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace EmployeeManager.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly EmployeeRepository _repository;

        public EmployeeController()
        {
            _repository = new EmployeeRepository();
        }

        public IEnumerable<Employee> Get()
        {
            return _repository.GetAll();
        }

        public Employee Get(Guid id)
        {
            return _repository.Get(id);
        }

        public Employee Post([FromBody]Employee employee)
        {
            return _repository.Create(employee);
        }

        public void Put(Guid id, [FromBody]Employee employee)
        {
            employee.Id = id;
            _repository.Update(employee);
        }

        public void Delete(Guid id)
        {
            _repository.Delete(id);
        }
    }
}
