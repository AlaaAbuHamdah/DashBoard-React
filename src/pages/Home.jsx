//useState تستخدم لإدارة الحالة في المكون مثل تخزين المنتجات ونص البحث وحالة التحميل
//useEffect  عند تحميل المكون(api)مثل جلب البينات من (side effects)تُستخدم لإجراء عمليات جانبية
import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
// داخل جافاسكريبت تُستخدم لتصميم المكونات بطريقة ديناميكية(css)مكتبة تستخدم لكتابة
import styled from "styled-components";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

const Container = styled.div`
  padding: 20px; //تضيف هامش داخلي لتحسين الشكل
  max-width: 1100px; //تحدد الحد الأقصى للعرض لتكون متجاوبة
  margin: 0 auto; //لتوسيط الحاوية أفقيًا.
`;

const Title = styled.h1`
  text-align: center; //توسيط العنوان
  color: #2c3e50;
`;

//حاوية لشريط البحث وازرار الفرز
const Actions = styled.div`
  display: flex; //لإنشاء مسافة بين العناصر
  gap: 10px; //لإنشاء مسافة بين العناصر
  margin-bottom: 15px;
  justify-content: center; //لتوسيط العناصر أفقيًا
  flex-wrap: wrap; //لضمان التوافق مع الشاشات الصغيرة
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  display: flex; //لمحاذاة الأيقونة والنص داخل الز
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: #2980b9;
  }
`;

function Home() {
  /*product (api)متغير حالة يخزن جميع المنتجات الأصلية المأخوذة من
يتم تهيئته كمصفوفة فارغة
عند جلب البيانات(setproduct)يتم تحديثه باستخدام
*/
  const [products, setProducts] = useState([]); // كل المنتجات (النسخة الأصلية)

  /*filteredProducts نسخة مفلترة من المنتجات تُستخدم لعرض المنتجات بعد البحث أو الفرز */
  const [filteredProducts, setFilteredProducts] = useState([]); // النسخة المعروضة بعد بحث/فرز

  /*loading (true/false)متغير حالة منطقي 
أثناء جلب البيانات(loading)يتحكم في عرض مكون
عند اكتمال الجلب أو حدوث خطأ(false)ويتغير إلى(true)يبدأ بقيمة*/
  const [loading, setLoading] = useState(true); // حالة التحميل

  //يخزن نص البحث الذي يدخله المستخدم في شريط البحث searchterm
  const [searchTerm, setSearchTerm] = useState(""); // نص البحث

  //جلب البيانات
  //useEffect (Dependencies)يتم تنفيذه مرة واحدة عند تحميل المكون بسبب المصفوفة الفارغة كمعامل للتبعيات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products"); //جلب البيانات
        const data = await res.json(); //  jsonتُحوّل الاستجابة إلى
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false); //عند اكتمال الجلب
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //فلترة البيانات بناءً على البحث
  //useEffect: (searchTerm, products)يتم تنفيذه كلما تغيرت قيمة
  //يقوم بفلترة المنتجات بناءً على نص البحثsearchTerm
  // فارغ يتم ارجاع جميع المنتجات(searchterm)اذا كان
  //يتم تحويل النصوص إلى حروف صغيرة لضمان البحث غير حساس لحالة الأحرف.
  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  //فرز المنتجات حسب السعر

  const sortByPrice = (order) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  return (
    <Container>
      <Title>🛒 Products Dashboard</Title>
      <Actions>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button onClick={() => sortByPrice("asc")}>
          <FaSortAmountUp /> Sort ↑
        </Button>
        <Button onClick={() => sortByPrice("desc")}>
          <FaSortAmountDown /> Sort ↓
        </Button>
      </Actions>
      {loading ? <Loader /> : <Table products={filteredProducts} />}
    </Container>
  );
}

export default Home;
