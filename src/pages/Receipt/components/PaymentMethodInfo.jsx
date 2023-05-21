import React, { useState } from "react";
import { Stack, Typography, Select, MenuItem, Chip } from "@mui/material";

function PaymentMethodInfo({ paymentChosen, setPaymentChosen }) {
  const bgWhite = { backgroundColor: "white" };

  const paymentChangeHandler = (event) => {
    setPaymentChosen(event.target.value);
  };

  return (
    <Stack
      style={{
        borderLeft: "2px solid orange",
        backgroundColor: "#f1edd955",
      }}
      marginTop={2}
      padding={3}
    >
      <Typography fontSize={20} marginBottom={2}>
        Phương thức thanh toán
      </Typography>
      <Stack>
        <Typography marginBottom={1}>
          Vui lòng chọn phương thức thanh toán
        </Typography>
        <Select
          id="payment-method"
          size="small"
          style={bgWhite}
          onChange={paymentChangeHandler}
          value={paymentChosen}
        >
          <MenuItem value="cash">
            Thanh toán khi nhận hàng bằng tiền mặt
          </MenuItem>
          <MenuItem value="transfer">Chuyển khoản ngân hàng</MenuItem>
        </Select>

        {paymentChosen === "cash" && (
          <Stack marginTop={2}>
            <Typography>
              Vui lòng chuẩn bị sẵn số tiền 200000đ khi nhận hàng tại địa điểm
              đã đề cập ở trên khi shipper gọi
            </Typography>
          </Stack>
        )}
        {paymentChosen === "transfer" && (
          <>
            <Stack
              marginTop={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography marginBottom={1}>Tổng thanh toán</Typography>
              <Typography fontSize={20}>200000đ</Typography>
            </Stack>
            <Stack marginTop={2}>
              <Typography marginBottom={1}>Internet Banking</Typography>
              <Stack>
                <Stack direction="row" spacing={1}>
                  <Chip label="1" size="small" style={{ marginRight: "4px" }} />
                  <Typography>
                    Mở ứng dụng/ web Chuyển khoản Ngân hàng (Internet Banking)
                    của bạn để tiến hành chuyển tiền.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} marginTop={1}>
                  <Chip label="2" size="small" style={{ marginRight: "4px" }} />
                  <Typography>
                    Nhập chính xác các thông tin chuyển khoản
                  </Typography>
                </Stack>
                <Stack
                  paddingY={2}
                  paddingX={4}
                  marginLeft={4}
                  marginBottom={1}
                  borderRadius={3}
                  style={{
                    backgroundColor: "#99ccff",
                    width: "fit-content",
                  }}
                >
                  <Typography>
                    <b>Số tài khoản: </b>1016976088
                  </Typography>
                  <Typography>
                    <b>Tên tài khoản: </b>Lê Văn Thiện
                  </Typography>
                  <Typography>
                    <b>Ngân hàng: </b>Vietcombank
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} marginTop={1}>
                  <Chip label="3" size="small" style={{ marginRight: "4px" }} />
                  <Typography marginBottom={1}>
                    Tiến hành Chuyển khoản.
                  </Typography>
                </Stack>
                <Typography marginLeft={4}>
                  Sau khi thanh toán thành công, sau 2 phút, tối đa là 72 giờ,
                  bạn sẽ nhận được Xác nhận đã thanh toán tại mục Thông báo -
                  Cập nhật đơn hàng
                </Typography>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default PaymentMethodInfo;
