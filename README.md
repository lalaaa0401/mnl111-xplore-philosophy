# 🧭 XPLORE PHILOSOPHY (MNL111) – Nền tảng Học & Thi Triết học Mác - Lênin

Ứng dụng web học tập và ôn thi trắc nghiệm môn **Triết học Mác - Lênin (MNL111)** được thiết kế dựa trên phong cách **Xplore Modern Adventure UI** từ Figma.

---

## 🌟 Các Tính Năng Nổi Bật

1. **🗺️ Hành Trình 3 Chương Lớn (Expeditions Overview):**
   * **Chương I:** Khái luận về Triết học & Triết học Mác - Lênin
   * **Chương II:** Chủ nghĩa Duy vật Biện chứng (Vật chất - Ý thức, 2 Nguyên lý, 3 Quy luật, 6 Cặp phạm trù)
   * **Chương III:** Chủ nghĩa Duy vật Lịch sử (Hình thái KT-XH, CSHT - KTTT, Giai cấp - Nhà nước)
   * Theo dõi tiến độ học tập và tỉ lệ thuộc bài theo từng chương.

2. **🎴 Flashcard Studio 3D (Chuẩn Quizlet):**
   * Lật thẻ 3D mượt mà (Click hoặc phím `Space`).
   * Phân loại *"Đã nhớ (Phím 2)"* và *"Cần ôn lại (Phím 1)"* theo phương pháp Spaced Repetition.
   * Tích hợp giọng đọc Tiếng Việt tự nhiên (Web Speech API).
   * Chế độ tự động chạy (Auto-play), trộn ngẫu nhiên (Shuffle) và xem dạng danh sách.

3. **⏱️ Phòng Thi Trắc Nghiệm (Quiz & Mock Exam):**
   * **Chế độ Luyện tập:** Xem ngay giải thích chi tiết chuẩn giáo trình sau mỗi câu.
   * **Chế độ Thi thử áp lực (25 phút):** Bảng ma trận 20 câu hỏi, đánh dấu câu cần xem lại, đồng hồ đếm ngược, tổng kết điểm và bắn pháo hoa ăn mừng khi đạt điểm cao.
   * Chức năng *"Làm lại các câu sai"* giúp tập trung khắc phục lỗ hổng kiến thức.

4. **🔍 La Bàn Thuật Ngữ (Quick Search Modal):**
   * Phím tắt `Ctrl + K` hoặc nút tìm kiếm trên thanh điều hướng để tra cứu nhanh hơn 40 khái niệm triết học cốt lõi.

---

## 📁 Cấu Trúc Thư Mục Dữ Liệu (Dễ Dàng Thêm Bớt Dữ Liệu)

Toàn bộ ngân hàng câu hỏi và thẻ học nằm tại thư mục `src/data/`:
* `src/data/chapters.json`: Danh sách các chương và chuyên đề học.
* `src/data/flashcards.json`: Danh sách thẻ flashcard, khái niệm, mẹo nhớ nhanh.
* `src/data/quizzes.json`: Ngân hàng câu hỏi trắc nghiệm, các lựa chọn và lời giải thích.
* `src/data/glossary.json`: Từ điển thuật ngữ tra cứu nhanh.

---

## 🚀 Cách Chạy Dự Án

```bash
# Cài đặt thư viện
npm install

# Khởi động máy chủ dev
npm run dev

# Mở trình duyệt tại:
http://localhost:5173/
```
