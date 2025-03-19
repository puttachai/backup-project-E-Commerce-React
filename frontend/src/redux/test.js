{popupVisibleEdit && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">แก้ไขที่อยู่</h2>
        <form onSubmit={handleUpdateAddress}>
        <div className="space-y-4">
          <div>
            <label>ชื่อ-นามสกุล</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={name_las}
              onChange={(e) => setName_las(e.target.value)}
              required
            />
          </div>
          <div>
            <label>เบอร์โทรศัพท์</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>ที่อยู่</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={addressline}
              onChange={(e) => setaddressline(e.target.value)}
              required
            />
          </div>
          <div>
            <label>เมือง</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>จังหวัด</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </div>
          <div>
            <label>รหัสไปรษณีย์</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>ประเทศ</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                อัพเดต
            </button>
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" type="button" onClick={handlePopupCloseEdit} >
                ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  )}