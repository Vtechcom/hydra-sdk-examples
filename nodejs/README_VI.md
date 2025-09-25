# Hydra SDK – Node.js Example

Hướng dẫn chạy ví dụ Hydra SDK trong môi trường Node.js (ESM), kèm các script mẫu để kiểm tra môi trường và ký giao dịch.

## Yêu cầu môi trường

- Node.js >= 18.x (khuyến nghị 20.x)
- pnpm hoặc npm
- Hỗ trợ ES Modules ("type": "module" trong package.json đã được cấu hình)

### Cài đặt Node.js >= 18

- Windows (dễ nhất): cài qua nvm-windows
  1. Tải nvm-setup từ https://github.com/coreybutler/nvm-windows/releases
  2. Cài đặt xong, mở PowerShell và chạy:
     - `nvm install 20` (hoặc 18+)
     - `nvm use 20`
  3. Kiểm tra: `node -v` (>= 18)

- Hoặc tải trực tiếp từ https://nodejs.org (chọn LTS >= 18)

## Cài đặt dependencies

Trong thư mục `hydra-sdk-examples/nodejs`:

```powershell
# Với pnpm (khuyến nghị)
pnpm install

# Hoặc dùng npm
npm install
```

Các package chính được dùng:
- `@hydra-sdk/core`
- `@hydra-sdk/transaction`
- `@hydra-sdk/cardano-wasm` (tự động chọn build dành cho Node.js)

## Cấu trúc thư mục

```
nodejs/
  package.json
  README.md
  scripts/
    environment-test.js   # Kiểm tra môi trường & tạo/ ký tx mẫu
    sign-tx.js            # Ký một CBOR hex transaction truyền từ CLI
```

## Scripts có sẵn

### 1) Kiểm tra môi trường + tạo/ ký giao dịch (environment-test.js)

Script này minh họa:
- Phát hiện môi trường Node.js
- Sinh mnemonic, khởi tạo `AppWallet` (PREPROD)
- Dựng một transaction mẫu bằng `TxBuilder`
- Lấy tx id, sau đó ký giao dịch

Chạy:

```powershell
node .\scripts\environment-test.js
```

Kết quả mong đợi (rút gọn):
- In thông tin môi trường (Node version, platform, cwd,...)
- In mnemonic được sinh
- In địa chỉ account
- In txId được dựng thành công
- In CBOR hex sau khi ký

Lưu ý:
- Đoạn input UTxO trong ví dụ là dữ liệu giả; mục đích là minh họa pipeline Builder → Tx → Sign.
- Khi áp dụng thực tế, bạn cần thay thế bằng UTxO thật của ví.

### 2) Ký giao dịch từ CBOR hex (sign-tx.js)

Script này nhận vào 1 tham số CBOR hex của giao dịch và ký bằng mnemonic cấu hình sẵn.

Sửa `scripts/sign-tx.js` để đặt mnemonic của bạn:

```js
const wallet = new AppWallet({
  key: { type: 'mnemonic', words: '<your mnemonic phrase>'.split(' ') },
  networkId: NETWORK_ID.PREPROD
})
```

Chạy ký:

```powershell
# Ký giao dịch đầy đủ
node .\scripts\sign-tx.js <CBOR_HEX> false

# Ký từng phần (partial sign)
node .\scripts\sign-tx.js <CBOR_HEX> true
```

Ví dụ:

```powershell
node .\scripts\sign-tx.js 83a40081825820... false
```

Output: In ra CBOR hex của giao dịch đã ký.

## Mẹo & Khắc phục sự cố (Troubleshooting)

- Lỗi import WASM hoặc module: đảm bảo Node >= 18 và `type: module` trong package.json.
- Lỗi thiếu dependency: chạy lại `pnpm install` hoặc `npm install` trong thư mục này.
- Ký giao dịch thất bại: kiểm tra mnemonic, networkId (PREPROD/Mainnet), và CBOR hex có hợp lệ.
- Nếu cần phí/UTxO thật để test: bạn phải nạp ví trên PREPROD và dùng UTxO thực khi build tx.

## License

This example is released under the Apache 2.0 License.
