$(document).ready(function() {
    let origin = window.origin;
    $('#filterForm').submit(function (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let city = formData.get('city');
        let loai_diem_den = formData.get('loai_diem_den');
        let khu_vuc = formData.get('khu_vuc');
        let o_gan = formData.get('o_gan');
        $.ajax({
            url: origin + '/destination/filter',
            method: 'POST',
            data: {
                city: city,
                loai_diem_den: loai_diem_den,
                khu_vuc: khu_vuc,
                o_gan: o_gan
            },
            success: function(data) {
                let html = ''
                if (data.length === 0) {
                    html = '<h2>Không tìm thấy kết quả phù hợp</h2>'
                    $('#data-container').html('');
                    $('#pagination-container').html('');
                } else {
                    $('#pagination-container').pagination({
                        dataSource: data,
                        pageSize: 5,
                        callback: function(data, pagination) {
                            // template method of yourself
                            const html = template(data);
                            $('#data-container').html(html);
                        }
                    })

                    function template(data) {
                        let html = ''
                        data.forEach((item) => {
                            html += `<div class="col-12 m-2">`
                            html += `<h5 class="">${item.tengoi.value}</h5>`
                            html += `<p class="">Địa chỉ: ${item.diachi.value}</p>`
                            html += `<a href="/visited?name=${item.tengoi.value}&address=${item.diachi.value}">[Chi tiết]</a>`
                            html += `</div>`
                        })
                        return html
                    }

                   html += `<h2>Tìm thấy ${data.length} kết quả phù hợp</h2>`;

                }

               $('#result-filter-destination').html(html)
            },
            error: function(er) {
                console.log(er.message)
            }
        })
        return false;
    });

    $('#filterFormLuuTru').submit(function (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let city = formData.get('city');
        let loai_luu_tru = formData.get('loai_luu_tru');
        let khu_vuc = formData.get('khu_vuc');
        let o_gan = formData.get('o_gan');
        let danh_gia = formData.get('danh_gia');
        let hang_sao = formData.get('hang_sao');

        $.ajax({
            url: origin + '/stay/filter',
            method: 'POST',
            data: {
                city: city,
                loai_luu_tru: loai_luu_tru,
                khu_vuc: khu_vuc,
                o_gan: o_gan,
                danh_gia: danh_gia,
                hang_sao: hang_sao
            },
            success: function(data) {
                let html = ''
                if (data.length === 0) {
                    html = '<h2>Không tìm thấy kết quả phù hợp</h2>'
                    $('#data-container').html('');
                    $('#pagination-container').html('');
                } else {
                    $('#pagination-container').pagination({
                        dataSource: data,
                        pageSize: 5,
                        callback: function(data, pagination) {
                            // template method of yourself
                            const html = template(data);
                            $('#data-container').html(html);
                        }
                    })

                    function template(data) {
                        console.log(data)
                        let html = ''
                        data.forEach((item) => {
                            html += `<div class="col-12 m-2">`
                            html += `<h5 class="">${item.tengoi.value}</h5>`
                            html += `<p class="">Địa chỉ: ${item.diachi.value}</p>`;
                            html += `<p class="">Điện thoại: ${item.dienthoai.value}</p>`;
                            if (regexDomain(item.trangweb.value)) {
                                html += `<p class="">Website: Đang cập nhật...</p>`
                            } else {
                                html += `<p class="">Website: <a href="${item.trangweb.value}">${item.trangweb.value}</a></p>`
                            }
                            html += `<p class="">Đánh giá: ${item.danhgia.value} (${Math.floor(item.soluongdanhgia.value)} đánh giá trên Google)</p>`
                            html += `<a href="/stay/detail?keyword=${item.tengoi.value}">[Chi tiết]</a>`
                            html += `</div>`
                        })
                        return html
                    }

                    html += `<h2>Tìm thấy ${data.length} kết quả phù hợp</h2>`;

                }

                $('#result-filter-destination').html(html)
            }
        })
        return false;
    });

    $('#filterEatingForm').submit(function (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let loai_an_uong = formData.get('loai_an_uong');
        let khu_vuc = formData.get('khu_vuc');
        let o_gan = formData.get('o_gan');
        let danh_gia = formData.get('danh_gia');

        $.ajax({
            url: origin + '/eating/filter',
            method: 'POST',
            data: {
                loai_an_uong: loai_an_uong,
                khu_vuc: khu_vuc,
                o_gan: o_gan,
                danh_gia: danh_gia
            },
            success: function(data) {
                let html = ''
                if (data.length === 0) {
                    html = '<h2>Không tìm thấy kết quả phù hợp</h2>'
                    $('#data-container').html('');
                    $('#pagination-container').html('');
                } else {
                    $('#pagination-container').pagination({
                        dataSource: data,
                        pageSize: 5,
                        callback: function(data, pagination) {
                            // template method of yourself
                            const html = template(data);
                            $('#data-container').html(html);
                        }
                    })

                    function template(data) {
                        let html = ''
                        data.forEach((item) => {
                            html += `<div class="col-12 m-2">`
                            html += `<h5 class="">${item.tengoi.value} (${item.danhgia.value}*)</h5>`
                            html += `<p class="">Địa chỉ: ${item.diachi.value}</p>`;
                            html += `<p class="">Điện thoại: ${item.dienthoai.value}</p>`;
                            html += `<p class="">Đánh giá: ${item.danhgia.value} (${Math.floor(item.soluongdanhgia.value)} đánh giá trên Google)</p>`
                            html += `<a href="/eating/detail?name=${item.tengoi.value}">[Chi tiết]</a>`
                            html += `</div>`
                        })
                        return html
                    }

                    html += `<h2>Tìm thấy ${data.length} kết quả phù hợp</h2>`;

                }

                $('#result-filter-destination').html(html)
            }
        })
        return false;
    });

    $('#filterMuasamForm').submit(function (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let loai_mua_sam = formData.get('loai_an_uong');
        let khu_vuc = formData.get('khu_vuc');
        let o_gan = formData.get('o_gan');

        $.ajax({
            url: origin + '/paying/filter',
            method: 'POST',
            data: {
                loai_mua_sam: loai_mua_sam,
                khu_vuc: khu_vuc,
                o_gan: o_gan,
            },
            success: function(data) {
                console.log(data)
                let html = ''
                if (data.length === 0) {
                    html = '<h2>Không tìm thấy kết quả phù hợp</h2>'
                    $('#data-container').html('');
                    $('#pagination-container').html('');
                } else {
                    $('#pagination-container').pagination({
                        dataSource: data,
                        pageSize: 5,
                        callback: function(data, pagination) {
                            // template method of yourself
                            const html = template(data);
                            $('#data-container').html(html);
                        }
                    })

                    function template(data) {
                        let html = ''
                        data.forEach((item) => {
                            html += `<div class="col-12 m-2">`
                            html += `<h5 class="">${item.tengoi.value}</h5>`
                            html += `<p class="">Địa chỉ: ${item.diachi.value.replace(/_/gi, " ")}</p>`;
                            html += `<p class="">Điện thoại: ${(item.dienthoai.value === 'N/A') ? 'Đang cập nhật' : item.dienthoai.value}</p>`;
                            html += `<a href="/paying/detail?name=${item.tengoi.value}&address=${item.diachi.value}">[Chi tiết]</a>`
                            html += `</div>`
                        })
                        return html
                    }

                    html += `<h2>Tìm thấy ${data.length} kết quả phù hợp</h2>`;

                }

                $('#result-filter-destination').html(html)
            }
        })
        return false;
    });

    function regexDomain(str) {
        let pattern = /http(s)?:\/\/(www\.)?google.com/;
        return str.match(pattern)
    }

})

