import React from 'react'
import { Box, FormControl, Button } from '@mui/material'
import classes from './AddProduct.module.scss'
import { useState } from 'react'
import { ProductState } from '../redux/products/products.reducer'
import { addProductAction } from '../redux/products/products.action'
import { connect } from 'react-redux'

interface IAddProductProps { 
    addProduct: Function 
}

const placeholderImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAD6CAYAAAAbbXrzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUUwMDAzQUQyQUM4MTFFMEI0MTdFOUE4QjVEMTk3RjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUUwMDAzQUUyQUM4MTFFMEI0MTdFOUE4QjVEMTk3RjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RTAwMDNBQjJBQzgxMUUwQjQxN0U5QThCNUQxOTdGOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RTAwMDNBQzJBQzgxMUUwQjQxN0U5QThCNUQxOTdGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlFEpL4AABA6SURBVHja7N1daFxpHcfxkzTvTZq0oWlJmrSh6StEFvZqQVFWFGFhwQtBFK920ZsFL0TwTrwQRMEbYb1xYUEUvPHOW1EsCpJFYXHTNJO0SZsm6UuSNs1L06b1/CYzyySZmZw5r8/znO8HjssubnfmzMzvPM///J/nNE1MTHgNOuUfb/vHF/1j1D+G/KPbP654AFDdin985h//8o8/+ccnYf6QpgYC6y3/+Il/vOMfxzj/ACJQYH3kHx/7x1bQf6k5wP9HI6c/+8c//eNdwgpADN70jw/94z/+8eW4AuvH/vE///gm5xdAAjQg+pt//M7bKy2FCiyNon7jH79kRAUgBe+Vgutso4F1rDQF/IBzCCDlaeI//GOkkcBSYf1dzh2ADIx5e/XykSCBpVaFn3HOAGRoqDTLa6sXWJ3+8QePmhUAM6aHH9YLrPfqzR0BIGXKpO9UCyyNqn7I+QFgGHUqdB8MLHWvj3FuABhG9awPDgbW9zkvAAylzoVT5cBSsf1tzgkAQ/WWR1kKrLdKoQUApvpeObDe4FwAMJxq7OMKrHHOBQALvKPAovcKgA3eUGANcR4AWGC8fJcQAEx3VoHVzXkAYIFuBRaLnQHYoK2ZcwDAFgQWAAILAAgsAAQWABBYAEBgASCwAIDAAoBoWtL8j7W2tnpjY2wdD7iiUCh4L168cDOwmpqavK6uLj5lwBH6TTMlBAACCwCBBQAEFgAQWAAILAAgsACAwAJAYAEAgQWAwAIAAgsACCwABBYAEFgAQGABILAAgMACAAILgONaOAXhvHr1ytva2vr80N+/fv3a293d9Vpa9k5rR0eH19nZWfxrW1sbJw0gsNLz8uVL7/Hjx97Tp0+99fX1YkAF1d7e7vX19Xm9vb1eT08PJxMgsJKxubnpPXjwwFtZWWkopCo9f/7cW15eLh4acQ0MDHj9/f1eczOzcoDAioFC5t69e97a2lqsf+729rY3Pz/vLS4ueoODg8XgSvtxSQCB5QiNopaWloqBEnZEFYQeQDk3N1ccvY2OjhbrXQBqYz5ywM7Ojjc1NeXdv38/0bCqpKL95ORkMSABMMIKPFW7detWqo/erhzVKSQVmCMjI0wRAUZYtamwrpFVFmFV6dGjR97s7GyxTQIAgXXIxsZGcWSltgUTqMhfKBQILYDA2k/9VAorNXya9ro04jPtdQEEVkZULzJ5+qVpql5fWsV/BKeWFxBYqVEIzMzMGDMNrEVd9QsLC3xTDRv93rx50/jvDoHlEIWARjA2UHd83M2rCEchdfv27eJfdVcXBFbiVGRXs6ZN1BnPFT17avQt30nWHV1bLnoElsX047etLqQfCVf0bCmgKke6+g7dvXuXE0NgJUcLmG29KuoHo654pE9F9mrh9OzZs+J3CgRW7Mrd5Da/fgrw2Zx31a1q3U3WAnl65gis2Gk4b/vt6CdPnlA3SZnWeKruWW+6zjpQAit2utvmAttuGNhMUz7t3BHku0VvFoEVG41K6l0lbaKaCXcMk6dVBnfu3Al0g4YCPIEVq9XVVWfei34cLr0fUymAGhk1abquAwRWZK41XnJnKvkLnPbvDxNyLKUisCLRPlc6XKLpLdPCZGiNqXr1wijv3Q8CKzQVTl2jq7iL78uE86q6VZSLge4YZr2vGoFFYPG+ckCjIy1ujkI9WerNAoEVevpEYOEoupMcV2Oxaox8PgRWqCG+q/0xLNOJj0ZF6maPs2BOAZ7AapgKqK5+afQjo/AeD03h4r4xoxGb1n+CwArM9R+0AhnRqHfq4cOHifzZmmJyUSGwAnN9T3R+DNHobp7uCib5+bAtEIFFYFVMCxFe1BaGINjoj8AKzPWiJ4EVnhaRa8/8NL6DrDMksAJx/QnKzc08WjIMFdjT3FuMjf4ILH7QBFboEU+9DfmSwkZ/BNaRWlpanH5/x44d41vcoKyemMRGfwRW7gOrra2Nb3EDtOwmyw0Q2eiPwDryB+1qHUvTwdbWVr7FAZWfKZjljRgK8ARWXQqr9vZ2J99bZ2cn3+AGaMsYE3ZRYKM/Aquu48eP875yTpvxmbRLK+sMCayauru7eV85pppR2A35knxNbPRHYOXmh62pbk9PD9/gI2TVwhAEG/0RWFV1dHQ4V8fSdND1O6BxhYKp+6EpRGlzILCqOnnyJO8nxVHN9PR05J07o1JQBXmmYJZYZ0hgVXXq1CmnpoMmvx81ZmqN3szMTGabDCaxIV9S4U6bA4F1iFoAXKn59Pf3Gzsd1OPUysVk7ZShkVYWdRoV2W1p0GSdIYFV1cDAgBPv48yZM0a+Li0oPri3lMJKoZXmNj9hnymYJdYZEliH9Pb2FgvwNlPtysT3oB/b7Oxs1WDStDCt6ZkC0rQWhqCvmwI8gbWPaj/nzp2z+vUPDQ0Z+drm5ubq1qvU2Z10rabcwmDrLqysMySwqo6ybK1laSpoYnuGFhMHqcFo3/Qk79rpdWR9ZzJq4FKAJ7AOOX/+vHX7SGkaODg4aNzrUutAIw8N1R3EJArMag1Ic0O+pLDOkMA6RKMUU6dWtaaCo6Ojxu06oamXWhcarU2pMB/nSMiWFoagWGdIYB2iO4Z9fX1WvNbh4WGvq6vLuOmLiuxhWhbK/25c9RqNrOJ+pmCWWGdIYFWlUYvpW7SobnX69GnjXpceXRVllKTRmdodohbI1aCa5YZ8SWGdIYF1+M03N3uXLl0ydp2hGkRNnLqqOTSO4rlGEoVCIXT/UXlDPhfpnDRSGySwckI7dl6+fNm4rYYVVro5YFrdSiET54NHVbQPW39K45mCWdLNCXXBg8DaR2F15coVY6aHmgZeuHDBuLDSVV9F9ri71jVia/QOn1ok8nA3jQI8gVUztK5evZppIV5TVNXVTG1uVQd5UouZVWRWCAWhAntepktq19CODiCwqgbGxYsXvZGRkdT7tLS/1bVr14zdhUFhkvT6PI0mNNqqx+QN+ZKiGxwuT30JrIh0V+769evFrvikadcFtS1odGfqOkfVmdLowC6HUb0N9/Tjzdv+UQorvW8QWDXpzuHY2FixtpXEFssKKnWuj4+PG72LhH4s6plKq46ikZPuHFbr0VIbRV77k9jor/S7IZrqU1gptFS70bRIW5dEGZ6fOHGieAdQuy6Y/rzE8ohnZ2cn9ZBUcV/nvfxka/0z3RXMawG6vM5Q54TAwpF0B1G1LR2asugOlUJMBeBaXdYaRWmaV948UGFl06Pl1byoxsws6NwqtNQnp2BXwT/t4DRNeaM/l3bPJbBSoAJ5tWcC6kemK6FCyrbF1QcpkLPen0lTQI2qFPQmPVMwS7o7qjvZtn+/wqKGFfMoTGv+bP8yqX5kSge5RhTaawt78r7RH4GFfertHJoVGif3y/NGfwQW9lGtiLtRZsvzRn8EFj6nW+e2Pbwhr/K60R+BhSKNqmx8eEOe5XGdIYGF0DuHIlt53OiPwMq5rJpDEY+8bfRHYPGFz6w5FNHlbaM/AivHTGgORXR52uiPwMqpuHcORbbyUoAnsHI6jVBzKHssuSMvG/0RWDm9GtMc6p48bPRHYOWMrsJsuesmhZXrNUkCK2fTBppD3aY921xeZ0hg5ejqm+bOociG6+sMCaycfInVHJrXFf554/I6QwIrB/SUZppD88XVNgcCy3EKKppD88fVdYYEluNf2rCPgYf9XFxnSGA5SiFFc2i+ubjOkMByFDuHQlxbZ0hgOYjmUFRyqQBPYDlGo6q87veN2t8JVy5gBJZDys2hql0AlVxZZ0hgOUTbxdAciloXM4UWgQUj6BZ2Hp+iguA0LbT9RgyB5QCaQxGEC+sMCSzL6eERNIciKLU4qNWBwEImV0w9novmUDRCzaS23pghsCxGcyjC0HIdW0sIBJal9Eh5mkMRlhZG23hHmcAKSCMZU65K7ByKOMoJNhbgCayA9OGqjyXrLTt2d3dpDkUsbNzoj8AKoHIBqQqW2jc7K+wcirgvxDbdYSawjqA7cAeHzpqOqYaUNppDETfbNvojsI5Qaw3W3Nyct7q6mtrroDkUSV4Ibdnoj8Cqo94q9/KDHdIY8dAciiTZtNEfgRVhfl/e1XN9fT2x18DOoUiDLRv9EVg1aGQV5APU1alQKHgbGxuJhWZSfzbQyAWawDKURjMLCwsNDamnp6dj7zpXYT/LO5LIFxs2+iOwqgiz2Zn6oxRaW1tbsbwG/Tk0h8KG7z6BZelVRh+0Qitqn5TCT4uaaQ5FFrMLkzf6I7AqaP6uUU2UebxuD09NTUW6TczOociSydvPEFgVNLKKo8AdJbT0WPm1tTU+DIDASm8orBGSpoeN1APUHuHCvtsAgZWwJIqNKpwrtFSTCjIqU78VzaEAgVWXpoFJ3c5VEV+hVa+Azs6hAIEVSByF9iCBqObSWqGlZRE0hwIE1pHSevSR6lPVpny6I/PgwQO+iQCBVV/aPSdaKF25iHl7e7u46wOAYFry/Oa1/CbtupG2pGlubvaGh4dpDgUIrGC0sDmrdVNaI6j9rWzZgwhgSpghEzbgJ6wAAiuQtArtAAisyCMbuskBAssK6nmiQRMgsIynQrvJK9EBEFhFtj7pFkAOA0tbDVNoBwgs46nQ3sge7QAIrMyo0E5HOUBgGY9CO0BgWYFCO0BgWWN5eZlCO0BgmU+F9sXFRT5hgMAyH4V2gMCygnb3pNAOEFjGU6GdXTwBAssKKrTz1GSAwDIehXaAwLIGhXaAwLKCnkhDoR0gsIxHRztAYFmDQjtAYFmBQjtAYFlDPVcU2gECy3gqtOsAQGAZjUI7QGBZg0I7QGBZQUHFw1ABAssKmgpqSgiAwDIahXaAwLIChXaAwLKGGkQptAMElvEUVEtLS3xiAIFlPgrtAKwILArtAKwILK0TnJ+f55MCYH5gqdC+s7PDJwXA7MBSoV1LcADA+MCi0A7AisBaXV2l0A7A/MBSoZ2OdgAHtZj4orTt8eDgIJ8OkIGmpiYCqxHt7e3FAwCMnxICAIEFgMACAAILAAgsAAQWABBYAEBgAbBIqo2jWsi8ubnJWQcckfbmBKkGlpbcTE5O8ikDYEoIgMACAAILAAgsAAQWABBYAEBgASCwAIDAAoD6gcVjlQHYYEeB9YzzAMACTxRYS5wHABZYUmBNcR4AWOBTBdYnnAcAFrihwPo75wGABf6iwPrUPwqcCwAG+7d/zJf7sP7I+QBgsI/0P+XA+q1HewMAM837x8eVgbVUCi0AMM1PvVKDe+XSnF8wygJgGLVd/b78N5WBteIfP+f8ADDErn+8X/rrocCSX3l71XgAMGEqeKPyHzRXSbTv+sdDzhWADP3V2ytTefUCS9ST9S3/2OKcAcjAZ/7x7cqpYL3AEnW/f90/nnDuAKTov/7xlVqzvHob+N0o/Yvs5gAgDVrX/FWvTknqqB1HlXZf8lhvCCBZvy5lzUq9/1OQLZILpZHW+0wRAcTsdilffuQFqJs3sqe71vJc9fZaHwguAFFo9vYD//hCIzO4pomJiTD/sTb/+IZ/fM0/Rv3jrH+8yWcAoAbVp+ZLhzZbCNXv+X8BBgCyxPZvFTbgegAAAABJRU5ErkJggg==`;

const AddProduct : React.FC<IAddProductProps> = ({ addProduct }) => {
    const [newProduct, setNewProduct] = useState<ProductState>({
        name: '',
        description: '',
        price: '',
        image: '',
    })
    const [error, setError] = useState({
        name: '',
        price: '',
    });

    const b64 = (file: File) => {
        var reader = new FileReader();
        reader.onloadend = function() {
          setNewProduct({...newProduct, image: reader.result})
        }
        reader.readAsDataURL(file);
    }

    const _handleSubmit = () => {
        const { name, price } = newProduct;
        if(!name || !price) {
            setError({
                name: name ? '' : 'Name is required',
                price: price ? '' : 'Price is required',
            });
        } else {
            addProduct({ 
                ...newProduct,
                image: newProduct.image || placeholderImg,
            });
            setNewProduct({
                name: '',
                description: '',
                price: '',
                image: '',
            });
        }
    }
    return (
        <Box
            className={classes.formContainer}
        >
                <FormControl variant="standard">
                    <label htmlFor="name" className={classes.label}>Product name <sup className={classes.errorMsg}>*</sup></label>
                    <input 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className={classes.inputField} 
                        type="text" placeholder='Enter product name' 
                    />
                    <p className={classes.errorMsg}>{error.name}</p>
                </FormControl>
                <FormControl variant="standard">
                    <label htmlFor="price" 
                    className={classes.label}>Price <sup className={classes.errorMsg}>*</sup></label>
                    <input 
                        value={newProduct.price}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className={classes.inputField} 
                        type="text" placeholder='Enter price' 
                    />
                    <p className={classes.errorMsg}>{error.price}</p>
                </FormControl>
                <FormControl variant="standard">
                    <label htmlFor="name" 
                    className={classes.label}>Product description <span>(Optional)</span></label>
                    <textarea 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className={classes.textArea} 
                        name="description" 
                        placeholder='Enter description'
                    ></textarea>
                </FormControl>
                <FormControl variant="standard">
                    <label htmlFor="name" className={classes.label}>Product Image <span>(Optional)</span></label>
                    <Box className={classes.fileUpload}>
                        <p>{newProduct.image ? 'Image uploaded!' : 'Choose File...'}</p>
                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                onChange={(event) => {
                                    b64(event!.target!.files![0]);
                                }}
                                type="file"
                                accept="image/*"
                                id="file-upload"
                                hidden
                            />  
                        </Button>
                    </Box>
                </FormControl>
                <Button onClick={_handleSubmit} variant="contained" color="primary" className={classes.addBtn}>Add product</Button>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addProduct: (payload: any) => dispatch(addProductAction(payload)),
    };
};

export default connect(null,mapDispatchToProps)(AddProduct)