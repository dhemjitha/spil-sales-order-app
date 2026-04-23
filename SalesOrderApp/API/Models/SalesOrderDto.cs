namespace API.Models
{
    public class SalesOrderDto
    {
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public string CustomerName { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string ReferenceNo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Suburb { get; set; }
        public string State { get; set; }
        public string PostCode { get; set; }
        public decimal TotalExcl { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalIncl { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<SalesOrderLineDto> OrderLines { get; set; }
    }
}