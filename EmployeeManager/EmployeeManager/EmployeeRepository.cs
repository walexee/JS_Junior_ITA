using EmployeeManager.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;

namespace EmployeeManager
{
    public class EmployeeRepository
    {
        private List<Employee> _employees;
        private readonly string _filename;

        private static ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();

        public EmployeeRepository()
        {
            _filename = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "employees.json");
            Initialize();
        }

        public Employee Get(Guid employeeId)
        {
            return _employees.FirstOrDefault(x => x.Id == employeeId);
        }

        public IEnumerable<Employee> GetAll()
        {
            return _employees;
        }

        public Employee Create(Employee employee)
        {
            employee.Id = Guid.NewGuid();
            employee.Created = DateTime.Now;
            employee.LastModified = DateTime.Now;

            _employees.Add(employee);

            SaveChanges();

            return employee;
        }

        public Employee Update(Employee employee)
        {
            var dbEmployee = Get(employee.Id);

            if (dbEmployee == null)
            {
                throw new InvalidOperationException("Employee does not exist in the database");
            }

            dbEmployee.Firstname = employee.Firstname;
            dbEmployee.Lastname = employee.Lastname;
            dbEmployee.JobTitle = employee.JobTitle;
            dbEmployee.PhoneNumber = employee.PhoneNumber;
            dbEmployee.Email = employee.Email;
            dbEmployee.LastModified = DateTime.Now;

            SaveChanges();

            return dbEmployee;
        }

        public void Delete(Guid employeeId)
        {
            _employees.RemoveAll(x => x.Id == employeeId);

            SaveChanges();
        }

        private void SaveChanges()
        {
            var json = JsonConvert.SerializeObject(_employees, Formatting.Indented);

            _lock.EnterWriteLock();

            try
            {
                File.WriteAllText(_filename, json);
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        private void Initialize()
        {
            var json = string.Empty;

            if (!File.Exists(_filename))
            {
                var file = File.Create(_filename);
                file.Close();
                file.Dispose();
            }
            else
            {
                _lock.EnterReadLock();

                try
                {
                    json = File.ReadAllText(_filename);
                }
                finally
                {
                    _lock.ExitReadLock();
                }
            }

            if (string.IsNullOrEmpty(json))
            {
                _employees = new List<Employee>();
                return;
            }

            _employees = JsonConvert.DeserializeObject<List<Employee>>(json);
        }
    }
}