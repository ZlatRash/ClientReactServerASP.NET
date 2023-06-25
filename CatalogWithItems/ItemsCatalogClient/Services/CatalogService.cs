using CatalogWithItemsData.Models;
using ItemsCatalogClient.Models.Config;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net;

namespace ItemsCatalogClient.Services
{
    public class CatalogService
    {
        private readonly IOptions<CatalogWithItemsWebAPIConfig> _cwiWebAPIConfig;

        public CatalogService( IOptions<CatalogWithItemsWebAPIConfig> cwiWebAPIConfig)
        { 
            _cwiWebAPIConfig = cwiWebAPIConfig;
        }

        #region GetItemById();

        public async Task<CatalogWithItemsData.Models.Category> GetCategoryById(int id)
        {
            return await GetItem<Category>("Category", id);
        }
        public async Task<CatalogWithItemsData.Models.Product> GetProductById(int id)
        {
            return await GetItem<Product>("Product", id);
        }
        private async Task<T> GetItem<T>(string method, int id) where T : class
        {
            using var httpClient = new HttpClient();

            try
            {
                var responce = await httpClient.GetAsync(_cwiWebAPIConfig.Value.Endpoint + method + "/" + id);
                var responceData = await responce.Content.ReadAsStringAsync();
                if (responce.StatusCode == HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<T>(responceData);
                    return result;
                }
            }
            catch { }
            {
                return null;
            }
        }
        #endregion GetItemByID();

        #region GetList();
        public async Task<List<CatalogWithItemsData.Models.Category>> GetCategories()
        {
            return await GetAll<Category>("Category");
        }
        public async Task<List<CatalogWithItemsData.Models.Product>> GetProducts()
        {
            return await GetAll<Product>("Product");
        }
        private async Task<List<T>> GetAll<T>(string method)
        {
            using var httpClient = new HttpClient();

            try
            {
                var responce = await httpClient.GetAsync((string)_cwiWebAPIConfig.Value.Endpoint + method);
                var responceData = await responce.Content.ReadAsStringAsync();
                if (responce.StatusCode == HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<List<T>>(responceData);
                    return result;
                }
            }
            catch { }
            {
                return null;
            }
        }
        #endregion GetList();

        #region EditItemByItem();

        public async Task<bool> EditCategory(Category category)
        {
          return await EditItem("Category",category);
        }
        public async Task<bool> EditProduct(Product product)
        {
            return await EditItem("Product", product);
        }
        private async Task<bool> EditItem<T>(string method, T item) where T : IItem
        {
            using var httpClient = new HttpClient();

            try
            {
                var responce = await httpClient.PostAsJsonAsync((string)_cwiWebAPIConfig.Value.Endpoint + method + "/" + item.Id, item);
                var responceData = await responce.Content.ReadAsStringAsync();
                if (responce.StatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
            }
            catch { }
            {
                return false;
            }
        }

        #endregion EditItemByItem();

        #region RemoveItemById()

        public async Task<bool> RemoveCategories(int id)
        {
            return await RemoveItemById("Category", id);
        }
        public async Task<bool> RenoveProducts(int id)
        {
            return await RemoveItemById("Product", id);
        }

        private async Task<bool> RemoveItemById(string method,int id)
        {
            using var httpClient = new HttpClient();

            try
            {
                var responce = await httpClient.DeleteAsync(_cwiWebAPIConfig.Value.Endpoint + method + "/" + id);
                var responceData = await responce.Content.ReadAsStringAsync();
                if (responce.StatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
            }
            catch { }
            {
                return false;
            }
        }
        #endregion RemoveItemByID()

        #region AddItem();
        public async Task<bool> AddProduct(Product product)
        {
            return await AddItem<Product>("Product", product);
        }
        public async Task<bool> AddCategories(Category category)
        {

            return await AddItem<Category>("Category", category);
        }
        
        public async Task<bool> AddItem<T>(string method,T item)
        {
            using var httpClient = new HttpClient();

            try
            {
                var responce = await httpClient.PutAsJsonAsync((string)_cwiWebAPIConfig.Value.Endpoint + method, item);
                var responceData = await responce.Content.ReadAsStringAsync();
                if (responce.StatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
            }
            catch { }
            {
                return false;
            }
        }
        #endregion AddItem();

    }
}
