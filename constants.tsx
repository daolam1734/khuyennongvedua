import React from 'react';
import { Sprout, Bug, BookOpen, MessageCircleQuestion, Droplets, Shovel, Sun, Coins, Box } from 'lucide-react';
import { CoconutCategory, RegionInfo, PestInfo, FarmingProcessInfo, TreeStage, MonthlyCareGuide, CoconutVariety } from './types';

export const APP_NAME = "Dừa Việt";

export const SYSTEM_INSTRUCTION = `
Bạn là "Kỹ sư Dừa Việt", một chuyên gia nông nghiệp hàng đầu (khuyến nông viên) chuyên về cây dừa tại Việt Nam.
Nhiệm vụ của bạn là tư vấn kỹ thuật, chẩn đoán bệnh và hỗ trợ bà con nông dân trồng dừa.

Kiến thức chuyên sâu cần có:
1. **Kỹ thuật trồng**: Chọn giống, khoảng cách trồng (dừa xiêm 5-6m, dừa ta 7-8m), kích thước hố.
2. **Bón phân**: 
   - Giai đoạn kiến thiết cơ bản (1-3 năm đầu): Ưu tiên Đạm (N) và Lân (P) để phát triển rễ, thân, lá.
   - Giai đoạn kinh doanh (cho trái): Cân đối N-P-K, đặc biệt Kali (K) và Clorua (muối ăn) để tăng đậu trái và chất lượng nước.
3. **Tưới nước**: Nhấn mạnh tầm quan trọng của nước trong mùa khô để hạn chế rụng trái non.
4. **Chăm sóc**: Vệ sinh cổ hấu (rửa nhen), bồi bùn, quản lý cỏ dại.

Phong cách trả lời:
- Thân thiện, gần gũi, dùng từ ngữ dễ hiểu cho nông dân (ví dụ: dùng "bà con", "cô bác").
- Ngắn gọn, súc tích, đi thẳng vào vấn đề.
- Luôn ưu tiên các giải pháp sinh học, an toàn môi trường.

Nếu người dùng hỏi vấn đề không liên quan đến nông nghiệp hoặc cây dừa, hãy khéo léo từ chối và hướng họ quay lại chủ đề chính.
`;

export const REGIONS: RegionInfo[] = [
  { 
    id: 'dbscl', 
    name: 'Đồng bằng sông Cửu Long', 
    description: 'Vùng trọng điểm, đất phù sa, phèn mặn nhẹ.' 
  },
  { 
    id: 'duyenhai_mientrung', 
    name: 'Duyên hải Nam Trung Bộ', 
    description: 'Đất cát, khí hậu khô nóng, gió bão.' 
  },
  { 
    id: 'dongnambo', 
    name: 'Đông Nam Bộ', 
    description: 'Đất đỏ bazan, đất xám, ít bão.' 
  },
  { 
    id: 'bacbo', 
    name: 'Phía Bắc', 
    description: 'Có mùa đông lạnh, cần kỹ thuật chống rét.' 
  },
  { 
    id: 'khac', 
    name: 'Vùng khác', 
    description: 'Tư vấn chung.' 
  }
];

export const CATEGORIES: CoconutCategory[] = [
  {
    id: 'kithuat',
    title: 'Kỹ thuật Trồng mới',
    icon: <Sprout className="w-6 h-6" />,
    prompt: "Hướng dẫn kỹ thuật trồng dừa mới: kích thước hố, khoảng cách trồng, và cách bón lót.",
    description: "Chuẩn bị đất, hố trồng và cây giống."
  },
  {
    id: 'chamsoc',
    title: 'Bón phân & Tưới nước',
    icon: <Droplets className="w-6 h-6" />,
    prompt: "Quy trình bón phân NPK và tưới nước cho dừa giai đoạn kinh doanh để đạt năng suất cao.",
    description: "Lịch trình dinh dưỡng và tưới tiêu."
  },
  {
    id: 'saubenh',
    title: 'Phòng trừ Sâu bệnh',
    icon: <Bug className="w-6 h-6" />,
    prompt: "Cách nhận biết và phòng trị các loại sâu bệnh nguy hiểm nhất trên cây dừa hiện nay.",
    description: "Đuông dừa, bọ cánh cứng, sâu đầu đen."
  },
  {
    id: 'giong',
    title: 'Giống & Hiệu quả KT',
    icon: <BookOpen className="w-6 h-6" />,
    prompt: "So sánh năng suất và hiệu quả kinh tế của các giống dừa uống nước phổ biến.",
    description: "Lựa chọn giống phù hợp thổ nhưỡng."
  }
];

export const COCONUT_VARIETIES: CoconutVariety[] = [
  {
    id: 'xiem_xanh',
    name: 'Dừa Xiêm Xanh',
    group: 'Dừa uống nước',
    description: 'Giống dừa phổ biến nhất tại Bến Tre, nổi tiếng với nước ngọt thanh.',
    characteristics: 'Vỏ quả màu xanh, trái nhỏ nhưng nhiều nước (250-350ml/trái). Cây lùn, cho trái sớm sau 2.5 - 3 năm trồng.',
    yield: 'Năng suất cao, trung bình 140 - 150 trái/cây/năm.',
    advisory: 'Thích hợp vùng nước ngọt hoặc nhiễm mặn nhẹ (<4‰). Giá trị kinh tế cao, đầu ra ổn định.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coconuts_in_Bentre.jpg/320px-Coconuts_in_Bentre.jpg'
  },
  {
    id: 'xiem_do',
    name: 'Dừa Xiêm Đỏ (Dừa Lửa)',
    group: 'Dừa uống nước',
    description: 'Giống dừa có khả năng chịu hạn và phèn mặn tốt hơn dừa xiêm xanh.',
    characteristics: 'Vỏ quả màu nâu đỏ hoặc vàng cam. Nước rất ngọt, gáo to hơn xiêm xanh một chút.',
    yield: 'Năng suất trung bình 120 - 140 trái/cây/năm.',
    advisory: 'Phù hợp cho các vùng đất phèn, mặn ven biển hoặc vùng khô hạn.',
    imageUrl: 'https://cdn.pixabay.com/photo/2014/12/22/07/28/coconuts-576856_640.jpg'
  },
  {
    id: 'dua_ta',
    name: 'Dừa Ta (Dừa Công Nghiệp)',
    group: 'Dừa công nghiệp',
    description: 'Giống dừa truyền thống, trái to, chủ yếu lấy cơm (cùi) để ép dầu hoặc làm kẹo, mỹ nghệ.',
    characteristics: 'Cây cao, gốc to, tuổi thọ lên đến 60-70 năm. Trái to, vỏ dày, cùi dày, hàm lượng dầu cao.',
    yield: 'Năng suất 60 - 80 trái/cây/năm. Bắt đầu cho trái sau 5-6 năm.',
    advisory: 'Thích hợp trồng xen canh (ca cao, bưởi). Chịu được gió bão tốt do bộ rễ vững chắc.',
  },
  {
    id: 'dua_sap',
    name: 'Dừa Sáp (Makapuno)',
    group: 'Dừa đặc sản',
    description: 'Đặc sản nổi tiếng của Trà Vinh (Cầu Kè). Cơm dừa xốp, mềm, nước sệt như keo.',
    characteristics: 'Hình thái giống dừa ta. Tuy nhiên, tỷ lệ trái sáp trên buồng chỉ đạt 20-25% (nếu thụ phấn tự nhiên).',
    yield: 'Giá trị kinh tế cực cao (gấp 10-20 lần dừa thường) nhưng kén đất và kỹ thuật.',
    advisory: 'Cần kỹ thuật thụ phấn nhân tạo hoặc nuôi cấy phôi để tăng tỷ lệ sáp. Chỉ thích hợp vùng đất cát pha nhẹ.',
  },
  {
    id: 'dua_dua',
    name: 'Dừa Dứa (Aromatic Coconut)',
    group: 'Dừa uống nước',
    description: 'Nước và cơm dừa có mùi thơm lá dứa đặc trưng.',
    characteristics: 'Trái nhỏ giống dừa xiêm. Rễ và lá non cũng có mùi thơm nhẹ. Độ ngọt cao (8-9% đường).',
    yield: 'Năng suất 100 - 120 trái/cây/năm.',
    advisory: 'Không trồng chung với các giống dừa khác để tránh lai tạp mất mùi thơm (cách ly > 500m).',
  }
];

export const PEST_DATABASE: PestInfo[] = [
  {
    id: 'duong_dua',
    name: 'Đuông Dừa',
    scientificName: 'Rhynchophorus ferrugineus',
    symptoms: 'Cổ hấu bị đục, lá non héo rũ và ngã ngang. Bên trong thân có tiếng rào rào do ấu trùng ăn. Nhựa nâu rỉ ra từ lỗ đục.',
    prevention: 'Vệ sinh vườn, tránh gây thương tích cho cây. Dùng bẫy Pheromone để bắt thành trùng.',
    treatment: 'Khoan lỗ vào chỗ bị hại, bơm thuốc lưu dẫn hoặc thuốc sinh học (nấm xanh, nấm trắng). Trám đất sét lại.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Rhynchophorus_ferrugineus_MHNT.jpg/320px-Rhynchophorus_ferrugineus_MHNT.jpg'
  },
  {
    id: 'bo_canh_cung',
    name: 'Bọ Cánh Cứng (Kiến Vương)',
    scientificName: 'Oryctes rhinoceros',
    symptoms: 'Tàu lá bị cắt vát hình tam giác hoặc hình chữ V. Cắn phá đọt non làm cây chậm phát triển, biến dạng.',
    prevention: 'Vệ sinh sạch sẽ mụn dừa, lá mục (nơi đẻ trứng). Dùng bẫy đèn.',
    treatment: 'Dùng nấm xanh Metarhizium rải vào hố trồng hoặc nơi ủ phân. Dùng móc sắt để bắt kiến vương thủ công.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Oryctes_rhinoceros.jpg/320px-Oryctes_rhinoceros.jpg'
  },
  {
    id: 'sau_dau_den',
    name: 'Sâu Đầu Đen',
    scientificName: 'Opisina arenosella',
    symptoms: 'Sâu ăn phần biểu bì mặt dưới lá già, nhả tơ kết dính phân tạo thành kén. Lá cháy khô từ dưới lên trên.',
    prevention: 'Bón phân cân đối, thăm vườn thường xuyên. Bảo vệ thiên địch (kiến vàng, ong ký sinh).',
    treatment: 'Cắt tỉa tiêu hủy tàu lá bị nặng. Phun chế phẩm sinh học Bacillus thuringiensis (BT). Thả ong ký sinh.',
  },
  {
     id: 'nam_benh',
     name: 'Bệnh Thối Đọt',
     scientificName: 'Phytophthora palmivora',
     symptoms: 'Lá xuất hiện đốm vàng nâu, sau lan rộng. Đọt non bị thối nhũn, có mùi hôi khó chịu.',
     prevention: 'Thoát nước tốt mùa mưa. Trồng mật độ vừa phải. Vệ sinh vườn.',
     treatment: 'Phun thuốc gốc Đồng (Bordeaux, Copper Oxychloride) hoặc các hoạt chất Metalaxyl, Fosetyl-aluminium.',
  }
];

export const FARMING_PROCESS_DATABASE: FarmingProcessInfo[] = [
  {
    id: 'trong_moi',
    title: 'Kỹ thuật Trồng mới',
    icon: <Sprout className="text-emerald-600" />,
    summary: 'Chuẩn bị đất, giống và cách trồng đúng kỹ thuật.',
    content: `
**Nguồn:** Viện Nghiên cứu Dầu và Cây có dầu (IOOP)

**1. Thời vụ trồng:**
- Tốt nhất là đầu mùa mưa (tháng 5-7 dương lịch) để cây con mau bén rễ, giảm công tưới.
- Vùng chủ động nước tưới có thể trồng quanh năm.

**2. Khoảng cách trồng (Mật độ):**
- **Dừa cao (Dừa ta, dừa dầu):** 8.5m x 8.5m (khoảng 140 cây/ha) hoặc 9m x 9m.
- **Dừa lùn (Dừa xiêm, dừa dứa):** 6m x 6m hoặc 6m x 7m (khoảng 270 - 300 cây/ha).
- **Kiểu trồng:** Nên trồng theo hình nanh sấu (tam giác đều) để tán lá tiếp xúc ánh sáng tối đa.

**3. Chuẩn bị hố trồng:**
- Kích thước hố: 60cm x 60cm x 60cm.
- Xử lý đất: Nếu đất phèn, cần rải vôi bột (1-2kg/hố).
- **Bón lót:** Trộn đều lớp đất mặt với:
  + 10-15kg phân hữu cơ hoai mục.
  + 0.5kg phân lân nung chảy (Lân Văn Điển).
  + 200g thuốc trừ sâu dạng hạt (Basudin/Vibasu) để ngừa bọ hung, mối.
- Lấp hố thành mô thấp trước khi trồng 15-30 ngày.

**4. Kỹ thuật đặt cây:**
- Đào một hốc nhỏ giữa mô, kích thước bằng bầu cây.
- Cắt đáy bầu, đặt cây vào hố sao cho **mặt bầu ngang hoặc thấp hơn mặt đất 3-5cm**.
- Rạch bỏ túi nylong, lấp đất và nén chặt xung quanh bầu (tránh làm vỡ bầu).
- Cắm cọc cố định cây để tránh gió lay làm đứt rễ non.
- Che phủ gốc bằng rơm rạ, cỏ khô để giữ ẩm.
    `
  },
  {
    id: 'bon_phan',
    title: 'Quy trình Bón phân',
    icon: <Shovel className="text-emerald-600" />,
    summary: 'Công thức phân bón cho từng giai đoạn phát triển.',
    content: `
**1. Dừa kiến thiết cơ bản (1-3 năm đầu):**
- **Mục tiêu:** Giúp cây mau lớn, bộ lá phát triển mạnh.
- **Loại phân:** NPK 20-20-15 hoặc phân chuyên dùng cho dừa con.
- **Liều lượng (gram/cây/năm):**
  + Năm 1: 500g, chia 4-6 lần bón.
  + Năm 2: 750g, chia 4 lần.
  + Năm 3: 1000g, chia 4 lần.
- Bổ sung phân hữu cơ: 5-10kg/gốc/năm vào đầu mùa mưa.

**2. Dừa kinh doanh (Giai đoạn cho trái ổn định):**
- **Mục tiêu:** Tăng năng suất, chất lượng nước, vỏ mỏng, gáo dày.
- **Loại phân:** NPK 13-13-13+TE, Kali Clorua (KCL).
- **Công thức khuyến cáo (kg/cây/năm):**
  + Phân NPK: 1.5 - 2.5 kg.
  + Kali (KCL): 0.5 - 0.8 kg (Dừa rất cần Kali để vận chuyển đường vào trái).
  + Muối ăn (NaCl): 300g - 500g (Bón bổ sung Clorua giúp tăng số lượng trái và độ dày cơm dừa).
- **Cách bón:** Đào rãnh tròn hoặc xới nhẹ đất cách gốc 1.5m - 2m (vùng rễ non hoạt động mạnh), rải phân và lấp đất lại. Nên bón khi đất đủ ẩm.
    `
  },
  {
    id: 'tuoi_nuoc',
    title: 'Kỹ thuật Tưới nước',
    icon: <Droplets className="text-blue-600" />,
    summary: 'Chế độ nước tưới quan trọng trong mùa khô.',
    content: `
**1. Nhu cầu nước:**
- Dừa chịu ngập tốt hơn chịu hạn. Thiếu nước trong mùa khô sẽ gây rụng trái non (hiện tượng "treo đọt"), trái nhỏ, ít nước.

**2. Phương pháp tưới:**
- **Mùa khô:** Tưới 2-3 ngày/lần. Lượng nước 30-50 lít/cây/lần.
- **Công nghệ tưới:** Khuyến khích lắp đặt hệ thống tưới phun mưa cục bộ hoặc nhỏ giọt quanh gốc. Tiết kiệm 40-50% nước và công lao động.
- **Giữ ẩm:** Tủ gốc là biện pháp bắt buộc trong mùa khô. Dùng mụn dừa, lá dừa, rơm rạ phủ bán kính 1.5m quanh gốc.

**3. Quản lý mặn:**
- Dừa chịu mặn khá (4-6‰). Tuy nhiên, nếu độ mặn > 8‰ kéo dài, cây sẽ vàng lá, trái rụng.
- Cần đóng cống ngăn mặn, trữ nước ngọt trong mương vườn để tưới khi hạn mặn xâm nhập.
    `
  },
  {
    id: 'thu_hoach',
    title: 'Thu hoạch & Năng suất',
    icon: <Box className="text-yellow-600" />,
    summary: 'Tiêu chuẩn thu hoạch dừa uống nước và dừa công nghiệp.',
    content: `
**1. Xác định thời điểm thu hoạch:**
- **Dừa uống nước (Dừa tươi):** 
  + Thu hoạch khi quầy trái được **7 - 7.5 tháng tuổi**.
  + Dấu hiệu: Vỏ màu tươi, da láng, búng tay vào trái nghe tiếng thanh, nước ngọt nhất, cơm vừa nạo (cháo cái).
  + Nếu hái sớm (6 tháng): Nước chua, ít nước. Hái muộn (>8 tháng): Nước lạt, cơm cứng (cơm dừa khô).
- **Dừa công nghiệp (Dừa khô):**
  + Thu hoạch khi trái **11 - 12 tháng tuổi**.
  + Dấu hiệu: Vỏ chuyển sang màu nâu, lắc nghe tiếng nước róc rách rõ (lắc nước). Hàm lượng dầu đạt tối đa.

**2. Kỹ thuật thu hoạch:**
- Dùng sào liêm hoặc trèo hái. 
- Với dừa uống nước: Cần nhẹ tay, dùng dây thừng hạ buồng dừa xuống đất để tránh dập trái, nứt gáo làm hư hỏng sản phẩm.
- Tần suất: 20-25 ngày/lần (mỗi tháng 1 buồng).

**3. Bảo quản sơ bộ:**
- Dừa tươi: Để nơi thoáng mát, tránh ánh nắng trực tiếp. Giữ nguyên vỏ xanh bảo quản được 10-14 ngày. Gọt kiểu kim cương bọc màng co bảo quản được 3-4 tuần (lạnh).
    `
  }
];

export const TREE_STAGES: TreeStage[] = [
    { id: 'new', name: 'Mới trồng', description: '< 1 năm tuổi' },
    { id: 'young', name: 'Kiến thiết cơ bản', description: '1 - 3 năm tuổi' },
    { id: 'business', name: 'Kinh doanh', description: '> 3 năm tuổi (đang cho trái)' },
];

// Simplified Data: Key = stageId_month (e.g., business_5 means Month 5 for Business trees)
// This is a helper, in a real app this would be a large JSON or DB
export const MONTHLY_CARE_DATA: Record<string, MonthlyCareGuide[]> = {
    'business': [
        {
            month: 1, season: 'Mùa khô',
            tasks: [
                { type: 'water', title: 'Tưới nước giữ ẩm', description: 'Tưới 2-3 ngày/lần. Tủ gốc bằng rơm rạ.' },
                { type: 'care', title: 'Vệ sinh mương vườn', description: 'Nạo vét mương để trữ nước ngọt.' },
                { type: 'pest', title: 'Phòng sâu đầu đen', description: 'Kiểm tra tàu lá già, cắt tỉa nếu thấy dấu hiệu.' }
            ]
        },
        // ... Assuming similar pattern, let's just make a generic lookup function in component or fill basic months
    ]
};
